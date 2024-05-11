export enum QueriesEnum {
    createStep = `MERGE (n:Step {id: 'step-1', title: 'O primeiro passo', content: 'O conteúdo do primeiro passo'})`,
    createTrail = `MERGE (t:Trail { id: 'trail-1', title: 'A primeira trilha'})`,
    createTheme = `MERGE (tm:Theme { id: 'theme-1', title: 'O primeiro tema' })`,
    createAcademy = `MERGE (a:Academy { id: 'academy-1', title: 'A primeira academia'})`,

    relationTrailStep = `MATCH (trail:Trail { id: 'trail-1' }) MATCH (step:Step { id: 'step-1' }) MERGE (trail)-[:HAS_STEP]->(step)`,
    relationThemeTrail = `MATCH (theme:Theme { id: 'theme-1' }) MATCH (trail:Trail { id: 'trail-1' }) MERGE (theme)-[:HAS_TRAIL]->(trail)`,
    relationAcademyTheme = `MATCH (academy:Academy { id: 'academy-1' }) MATCH (theme:Theme { id: 'theme-1' }) MERGE (academy)-[:HAS_THEME]->(theme) `,
}
