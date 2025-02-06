type AnyFruitProps = {
  name: string;
};

export async function AnyFruit({ name }: AnyFruitProps) {
  const fruitResponse = await fetch(
    `https://httpbin.org/anything?fruit=${name}`,
  );
  const fruitResponseObject = await fruitResponse.json();
  const fruit = fruitResponseObject.args.fruit;

  return <pre aria-label="Fruit">{fruit}</pre>;
}
