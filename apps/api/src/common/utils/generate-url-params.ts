export function generateQueryParams(obj) {
  const str: string[] = [];
  const object = JSON.parse(JSON.stringify(obj));
  for (const p in object)
    if (object.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + '=' + encodeURIComponent(object[p]));
    }
  return str.join('&');
}
