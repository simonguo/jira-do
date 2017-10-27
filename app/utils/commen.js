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