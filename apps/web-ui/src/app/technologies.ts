interface TechnologyItem {
  isBig?: boolean;
  name: string;
  image: string;
}

export const technologies: TechnologyItem[] = [
  { isBig: true, name: 'Amazon Web Services', image: 'tech/aws.svg' },
  { isBig: true, name: 'NodeJS', image: 'tech/nodejs.svg' },
  { isBig: true, name: 'React', image: 'tech/react.svg' },
  { isBig: true, name: 'PostgreSQL', image: 'tech/postgresql.svg' },
  { name: 'Typescript', image: 'tech/typescript.svg' },
  { name: 'Javascript', image: 'tech/javascript.svg' },
  { name: 'NextJS', image: 'tech/nextjs.svg' },
  { name: 'Material UI', image: 'tech/material-ui.svg' },
  { name: 'Golang', image: 'tech/golang.svg' },
  { name: 'Serverless', image: 'tech/serverless.svg' },
  { name: 'Graphql', image: 'tech/graphql.svg' },
  { name: 'Redux', image: 'tech/redux.svg' },
];
