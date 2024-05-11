import { json } from "@remix-run/node";
import { createNodes } from "./api-neo4j/create-nodes.neo4j";
import Button from "./components/button.component";
import Card from "./components/card.component";
import Dialog from "./components/dialog.component";
import { useState } from "react";
import { buildNodeQuery, buildNodeRelationQuery, runQuery } from "./api-neo4j/query.neo4j";
import { QueriesEnum } from "enums/queries.enums";
import { useLoaderData } from "@remix-run/react";
import { NodeEnum } from "enums/node.enums";
import { IParams } from "interfaces/params.interface";
import { RelationEnum } from "enums/relation.enum";

export async function loader({ params }:IParams) {
  const node = NodeEnum
  const relation = RelationEnum
  try {
    await createNodes()

    const trailStepQuery = buildNodeRelationQuery(node.trail,relation.has_step,node.step,'trailStep')
    const trailQuery= buildNodeQuery(node.trail,params.trailId)
    
    const [getTrailStep, getTrail] = await Promise.all([
      runQuery(trailStepQuery),
      runQuery(trailQuery),
    ]);
    
    const stepTrail = getTrailStep.records.map(record => record.entries().next().value[1].end)
    const trail = getTrail.records.map(record => record.entries().next().value[1].properties)
    
    return json({ stepTrail, trail })
  } catch (error) {    
    throw new Response("Not Found", { status: 404 });
  }
}

export default function Explore() {
  const [isOpen, setIsOpen] = useState(false);
  const data = useLoaderData<typeof loader>();
  
  if (data.trail.length === 0 || data.stepTrail.length === 0) {    
    throw new Response("Not Found", { status: 404 });
  }

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="h-full">
      <div className="flex pb-10 bg-[#F8F8F8] w-full h-full flex-col items-center ">
        <div className="flex w-[50rem] justify-between  mt-20 flex-col">
          <div className="flex w-full flex-row justify-between h-12 mb-10">
            <h1 className="font-semibold text-3xl leading-10 flex items-center justify-center">
              {data.trail[0].title }
            </h1>
            <Button
              buttonClass="flex bg-[#7357FF] rounded-xl w-[11.563rem] font-semibold text-white justify-center items-center hover:bg-[#674ee5]"
              imgClass="mr-4"
              imgSrc="../../assets/icons/Union.svg"
              text="Adicionar passo"
              func={toggleModal}
            ></Button>
          </div>
          {data.stepTrail.map((data) => (
            <Card title={data.properties.title} content={data.properties.content} key={data.elementId}></Card>
          ))}
          <Dialog isOpen={isOpen} onClose={toggleModal} data={data}></Dialog>
        </div>
      </div>
    </div>
  );
}
