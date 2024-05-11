import neo4j, { QueryResult, RecordShape } from 'neo4j-driver';
import { RelationType } from 'types/relation.type';

/**

This function asynchronously executes a Cypher query against a Neo4j graph database.
*
*@param {string} query The Cypher query string to be executed.
*@returns {Promise<QueryResult<RecordShape>>} A promise that resolves to the query result object containing the records returned by the Neo4j driver. The record shape (RecordShape) depends on the structure of the data returned by the query.
*@throws {Error} Any errors encountered during the database interaction (e.g., connection errors, query execution errors) will be propagated through the returned promise as exceptions.
*/
export async function runQuery (query:string):Promise<QueryResult<RecordShape>>
{
  const driver = neo4j.driver('neo4j://localhost:7687',neo4j.auth.basic('neo4j', 'password'))
  const session = driver.session();
  try {
    const res = await session.run(query);
    return res
  } catch(err){
    throw new Response("Not Found", { status: 404 });
  }
  finally {
    await session.close();
  }
}

/**
 * This function builds a Cypher query that retrieves all relationships of the type
 * `HAS_STEP` that originate from a node of the provided label (`firstNode`) and (`secondNode`).
 * The query returns the entire relationship chain (`n`) or as desired alias.
 * 
 *@param {string} firstNode The label of the starting node in the relationship chain.
 *@param {RelationType} relation The relation between nodes
 *@param {string} [secondNode] The label of the ending node in the relationship chain.
 *@param {string} [alias] An optional alias to assign to the returned relationship chain in the query result.
 *@returns {string} The constructed Cypher query string. 
 */
export function buildNodeRelationQuery (firstNode:string, relation:RelationType, secondNode: string, alias?: string):string {
  const query = `MATCH r=(n:${firstNode})-[:${relation}]->(s:${secondNode}) RETURN r ${alias? 'AS '+alias:''}`;
  return query
}

/**
This function constructs a Cypher query string designed to retrieve a specific node by label and ID from a graph database.
*
*@param {string} node The label of the node you want to find in the graph.
*@param {string} id The unique identifier of the target node.
*@returns {string} The constructed Cypher query string.
*/
export function buildNodeQuery (node:string, id:string):string {
  const query = `MATCH (n:${node} { id: '${id}' }) RETURN (n)`;
  return query
}

