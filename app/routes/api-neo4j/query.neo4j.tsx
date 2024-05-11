import neo4j from 'neo4j-driver';

export async function runQuery (query:string) {
  const driver = neo4j.driver('neo4j://localhost:7687',neo4j.auth.basic('neo4j', 'password'))
  const session = driver.session();
  try {
    const res = await session.run(query);
    return res
  } finally {
    await session.close();
  }
}

