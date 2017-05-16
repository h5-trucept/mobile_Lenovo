!(function(name,factory){
    if(typeof define === 'function' && define.amd) define(factory);//AMD
    else if(typeof module === 'object' && module.exports) module.exports = factory();//CommonJS
    else this[name] = factory();//Global
})('prdPlatInfo',function(){
    var cacheData = {};
    return {
        init:function(opts){
            var className = opts.elm,gcode = opts.gcode,controller = opts.controller,elms = $(className),arr = [],
                url = opts.url,
                self = this;
            elms.each(function(){
                var code = $(this).attr(gcode);
                arr.push(code);
            })
            if(!arr.length) return;
            $.getJSON(url + arr.join(','),function(result){
                var data = result.data || [];
                $.each(data,function(){
                    var gcode = this['code'];
                    cacheData[gcode] = this;
                })

                elms.each(function(){
                    $(this).find('[' + controller + ']').each(function(){
                        var fn = $(this).attr(controller),code = $(this).attr(gcode) || $(this).parents(className).attr(gcode);
                        this.scope = cacheData[code];
                        (new Function(fn + '.call(this)')).call(this);
                    })
                })
            });
        }
    }
});
//初始化调用逻辑
prdPlatInfo.init({
    elm:'.prod',
    gcode:'gcode',
    controller:'controller',
    url:'/cache/query?m=hmget&k=product_price&f='
});
