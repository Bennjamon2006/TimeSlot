export default function hashName(name: string) {
  let n = 0;

  for (let i = 0; i < name.length; i++) {
    n = (n * 31 + name.charCodeAt(i)) >>> 0;
  }

  return n;
}
