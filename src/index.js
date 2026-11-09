import buildDictionary from "./buildDictionary";
import { getSplitedStr } from "./utils/regexp";

const search = (docs, substring) => {
  const splitedSubstring = getSplitedStr(substring);

  if (!splitedSubstring?.length) return [];

  const countDocs = docs.length;
  const dictionary = buildDictionary(docs);

  const substringIDF = splitedSubstring.reduce((acc, sub) => {
    const countDocsWithSub = [...new Set(dictionary[sub])].length;
    // acc[sub] = Math.log(countDocs / (countDocsWithSub + 1)) + 1;
    
    acc[sub] = Math.log2(1 + (countDocs - countDocsWithSub + 1) / (countDocsWithSub + 0.5));
    return acc;
  }, {});

  const coincidences = splitedSubstring.reduce((acc, sub) => {
    dictionary[sub]?.forEach((idDoc) => {
      if (!Object.hasOwn(acc, idDoc)) {
        acc[idDoc] = { [sub]: 0 };
      }
      acc[idDoc] = {
        ...acc[idDoc],
        [sub]: (Object.hasOwn(acc[idDoc], sub) ? acc[idDoc][sub] : 0) + 1,
      };
    });
    return acc;
  }, {});

  return Object.entries(coincidences).map(([key, value]) => {
    const { text } = docs.find(({ id }) => id === key);
    const lengthText = getSplitedStr(text).length;
    
    const docScore = Object.entries(value).reduce((acc, [sub, countSub]) => {
      const tf = countSub / lengthText;
      return acc + (tf * substringIDF[sub]);
    }, 0);
    return { id: key, score: docScore };
  }).sort((a, b) => b.score - a.score).map(({ id }) => id);
};

export default search;
