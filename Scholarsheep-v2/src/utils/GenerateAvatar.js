const generateDiceBearPersonas = (seed) =>
  `https://avatars.dicebear.com/api/personas/${seed}.svg`;

const generateDiceBearBottts = (seed) =>
  `https://avatars.dicebear.com/api/bottts/${seed}.svg`;

const generateDiceBearPixelArt = (seed) =>
  `https://avatars.dicebear.com/api/pixel-art/${seed}.svg`;
  
const generateDiceBearAvataaars = (seed) =>
  `https://avatars.dicebear.com/api/avataaars/${seed}.svg`;

export const generateAvatar = () => {
  const data = [];

  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearPersonas(Math.random());
    data.push(res);
  }

  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearAvataaars(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearBottts(Math.random());
    data.push(res);
  }
  for (let i = 0; i < 2; i++) {
    const res = generateDiceBearPixelArt(Math.random());
    data.push(res);
  }
  return data;
};