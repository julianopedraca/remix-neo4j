import { Neo4jError } from "neo4j-driver";
import { runQuery } from "./query.neo4j";

export async function createConstraints(constraints: string[]) {
    try {
        for (const constraint of constraints) {
            const query = `CREATE CONSTRAINT ${constraint}_isunique FOR (n:${constraint.charAt(0).toUpperCase() + constraint.slice(1)}) REQUIRE n.id IS UNIQUE`;
            await runQuery(query)
        }
    } catch (error) {
        console.error('Error creating constraints:', (error as Neo4jError).message);
    }
}
