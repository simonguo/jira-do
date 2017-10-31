export function getMatches(reg, str) {
  let matches = [];
  while (true) {
    let m = reg.exec(str);
    if (m) {
      matches.push(m[0]);
    } else {
      break;
    }
  }
  return matches;
}

export function shallowEqual(obj1, obj2, from, obj) {
  if (obj1 === obj2) {
    // console.log(obj1);
  }
  for (let prop in obj1) {
    if (obj1[prop] !== obj2[prop]) {
      console.log(`--------------    ${from}  -----   ${prop}`);
      // console.log(prop);
      console.log(obj1[prop]);
      console.log(obj2[prop]);
    }
  }
}