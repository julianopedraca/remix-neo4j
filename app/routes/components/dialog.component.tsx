import { IModalStatus } from "interfaces/modal-status.interface";
import Button from "./button.component";
import { buildNodeQuery, buildNodeRelationQuery, runQuery } from "../api-neo4j/query.neo4j";
import { NodeEnum } from "enums/node.enums";
import { RelationEnum } from "enums/relation.enum";

export default function Dialog({ isOpen, onClose, data }: IModalStatus) {
    const node = NodeEnum
    const relation = RelationEnum

    async function handleSubmit(e: { preventDefault: () => void; target: any; }) {

        // Prevent the browser from reloading the page
        e.preventDefault();

        // Read the form data
        const form = e.target;
        const formData = new FormData(form);

        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());

        await runQuery(`MATCH (t:Trail {id: 'trail-1'}) 
        CREATE (t)-[:HAS_STEP]->(s:Step {id: '${formJson.id}', title: '${formJson.title}', content: '${formJson.content}'})
        `);

        const trailStepQuery = buildNodeRelationQuery(node.trail,relation.has_step,node.step,'trailStep');
        const  getTrailStep = await runQuery(trailStepQuery);
        const stepTrail = getTrailStep.records.map(record => record.entries().next().value[1].end)

        data.stepTrail = stepTrail

        onClose()
    }

    return (
        <div>
            {
                isOpen ? (
                    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <div className="relative p-12 h-[36rem] w-[42.5rem] gap-10 transform overflow-hidden rounded-3xl bg-white shadow-xl transition-all">
                                    <div className="h-10 flex justify-start flex-col text-left">
                                        <p className="text-left tracking-[-0.01em] text-3xl font-semibold mb-5">Adicionar passo</p>
                                        <form onSubmit={handleSubmit}>
                                            <div className="mt-4">
                                                <label className="text-sm font-semibold text-left text-[#4F4B5C] h-7 ml-1" htmlFor="id">id</label>
                                                <br />
                                                <input
                                                    id="id"
                                                    name="id"
                                                    className="w-full h-12 px-3 py-4 rounded-xl border border-[#ECECED] bg-[#F8F8F8] gap-2 text-[#110C22] font-semibold text-base"
                                                    required
                                                    />
                                            </div>

                                            <div className="mt-4">
                                                <label className="text-sm font-semibold text-left text-[#4F4B5C] h-7 ml-1" htmlFor="title">Título</label>
                                                <br />
                                                <input
                                                    id="title"
                                                    name="title"
                                                    className="w-full h-12 px-3 py-4 rounded-xl border border-[#ECECED] bg-[#F8F8F8] gap-2 text-[#110C22] font-semibold text-base"
                                                    required
                                                    />

                                            </div>

                                            <div className="mt-4">
                                                <label className="text-sm font-semibold text-left text-[#4F4B5C] h-7 ml-1" htmlFor="content">Conteúdo</label>
                                                <br />
                                                <textarea
                                                    id="content"
                                                    name="content"
                                                    rows={4}
                                                    className="resize-none w-full px-3 py-4 rounded-xl border border-[#ECECED] bg-[#F8F8F8] gap-2 text-[#110C22] font-semibold text-base"
                                                    required
                                                    ></textarea>
                                            </div>
                                            <div className="flex right-0 gap-2 justify-end mt-5">
                                                <Button
                                                    buttonClass="flex h-12 bg-[#F9F8FF] rounded-xl w-[11.563rem] font-semibold border border-[#E2DCFF] text-[#7357FF] justify-center items-center hover:bg-[#E0DFE5]"
                                                    text="Cancelar"
                                                    type="button"
                                                    func={onClose}
                                                ></Button>

                                                <Button
                                                    buttonClass="flex h-12 bg-[#7357FF] rounded-xl w-[11.563rem] font-semibold text-white justify-center items-center hover:bg-[#674ee5]"
                                                    text="Criar passo"
                                                    type="submit"
                                                ></Button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}
