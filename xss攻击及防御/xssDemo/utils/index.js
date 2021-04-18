const cheerio = require('cheerio')
module.exports = {
    encodeHtml: function (string) {
        if (!string) return string
        return string.replace(/[<>]/g, function (char) {
          return {
            '<': '&lt;',
            '>': '&gt;',
          }[char]
        })
      },
      encodeHtmlProperty: function (string) {
        if (!string) return string
        return string.replace(/["']/g, function (char) {
          return {
            '"': '&quot;',
            "'":  '&#39;',
          }[char]
        })
      },
      xssFilter:function(html){
        if(!html){
            return ''
        }
        var whiteList = {
            'img':['src'],
            'span':['style']
        }
        const $ = cheerio.load(html)

        $('span,img,script').each(function(index,element){
            
            if(!whiteList[element.name]){
                
                $(element).remove()
                return
            }
            for(var attr in element.attribs){
                if(!~whiteList[element.name].indexOf(attr)){
                    $(element).attr(attr,null)
                }
            }
        })
        return $.html()
      }
}