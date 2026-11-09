import { getSplitedStr } from "./utils/regexp";

const buildDictionary = (docs) => docs
.reduce((acc, doc) => {
  getSplitedStr(doc.text).forEach((sub) => {
    if (!Object.hasOwn(acc, sub)) {
      acc[sub] = [];
    }
    acc[sub].push(doc.id);
  });
  return acc;
}, {});

export default buildDictionary;
