import { Neo4jError } from "neo4j-driver";
import { runQuery } from "./query.neo4j";
import { IQueries } from "interfaces/queries.interface";
import { QueriesEnum } from "enums/queries.enums";

/**
 * Create first nodes to execute the application
 */
export async function createNodes() {
    const queries = QueriesEnum;

    const createNodeQueries: IQueries = {
        step: queries.createStep,
        trail: queries.createTrail,
        theme: queries.createTheme,
        academy: queries.createAcademy
    }

    const createRelationQueries: IQueries = {
        trailStep: queries.relationTrailStep,
        themeTrail: queries.relationThemeTrail,
        themeAcademy: queries.relationAcademyTheme,
    }

    try {

        // check if the node already exists, if dont create it
        for (const query in createNodeQueries) {
            await runQuery(createNodeQueries[query])
        }

        for (const query in createRelationQueries) {
            await runQuery(createRelationQueries[query]);
        }

    } catch (error) {
        console.error('Error creating nodes:', (error as Neo4jError).message);
    }
}
