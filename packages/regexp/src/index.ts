/*eslint no-control-regex: "off"*/
const chinese = /[^\x00-\xff]/g
const html = /<[^>]+>/g

export { chinese, html }
