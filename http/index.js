function add(){
    var arg = arguments
    var args = Array.prototype.slice.call(arg)
    return args.reduce(function(pre,current){
        return pre+current
    })
}
module.exports = add