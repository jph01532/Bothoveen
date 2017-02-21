(function(b){b.textClear=function(d,a){this.textbox=b(d);this.options=b.extend({},b.textClear.defaults,a||{});this.container=null;this.button=null;this.buttonClickEvent=null;if(!a||a.rtl===undefined){this.options.rtl=(b("html").attr("dir")||"").toLowerCase()==="rtl"}if(!this.container){this.container=b("<span>").attr({id:this.textbox.attr("id")+"_container"}).addClass("text-container").css({position:"relative",display:"inline-block"})}if(!this.button){this.button=b(this.options.btnElement).attr({id:this.textbox.attr("id")+this.options.btnIdSuffix,title:this.options.btnToolTip,tabindex:this.options.btnTabIndex,"aria-hidden":true,"class":this.options.btnCssClass,"data-auto":"text_clear_button"}).text(this.options.btnText)}this.buttonClickEvent=function(f){var c=b(f.target);if(this.options.useClearButtonEvent&&this.options.clearButtonSelector&&b(this.options.clearButtonSelector).length){b(this.options.clearButtonSelector).first().trigger("click")}else{if(b.isFunction(this.options.onClear)){a.onClear.apply(this,[c])}else{this.textbox.val(this.options.defaultTextValue)}}if(this.options.focusAfterClear){this.textbox.focus()}this.button.toggleClass("visible",this.textbox.val().length>0);f.preventDefault();f.stopPropagation()};this.textChangeEvent=function(c){this.setPosition();this.button.toggleClass("visible",this.textbox.val().length>0)};this.setup()};b.textClear.defaults={btnElement:"<a>",btnTabIndex:-1,btnToolTip:"Clear",btnCssClass:"clear-button",btnText:"",btnIdSuffix:"-clear",alterTextPadding:false,onClear:b.noop(),focusAfterClear:true,absolutePosition:true,clearButtonSelector:".evt-clear",useClearButtonEvent:true,spacingConstant:4,ltrTextBoxClassName:"ltr-text",rtlTextBoxClassName:"rtl-text"};b.extend(b.textClear.prototype,{setup:function(){if(this.options.absolutePosition){this.textbox.wrap(this.container)}this.button.insertAfter(this.textbox).on("click.textClear",b.proxy(this.buttonClickEvent,this));this.setPosition();if(this.options.clearButtonSelector&&b(this.options.clearButtonSelector).length&&!b(this.options.clearButtonSelector).hasClass("hidden")){b(this.options.clearButtonSelector).addClass("hidden")}this.textbox.on("keyup.textClear paste.textClear change.textClear",b.proxy(this.textChangeEvent,this));this.textChangeEvent()},setPosition:function(){var w=this.textbox.get(0),o=this.textbox.is("textarea"),r={left:parseInt(this.textbox.css("padding-left"),10),right:parseInt(this.textbox.css("padding-right"),10)};var p=(this.textbox.attr("dir")||b("html").attr("dir")||"").toLowerCase()==="rtl",u=(this.options.rtl)?"right":"left",s=(this.options.rtl)?"left":"right";var a=(p)?this.options.rtlTextBoxClassName:this.options.ltrTextBoxClassName;this.textbox.removeClass(this.options.rtlTextBoxClassName+" "+this.options.ltrTextBoxClassName).addClass(a);if(this.options.alterTextPadding&&r[s]<this.button.outerWidth()){if(p===this.options.rtl){this.textbox.css("padding-"+s,this.button.outerWidth()+r[u]+this.options.spacingConstant)}else{this.textbox.css("padding-"+u,this.button.outerWidth()+r[s]+this.options.spacingConstant)}}if(this.options.absolutePosition){var q=w.parentElement,x=q.getBoundingClientRect(),v=w.getBoundingClientRect(),n=this.textbox.position();n[u]=(v[u]-x[u]);if(this.options.rtl){n[u]*=-1}n[s]=n[u]+this.textbox.outerWidth();n.top=v.top-x.top;var t={};t.position="absolute";t[s]="auto";t.top=n.top+((o)?4:Math.round(this.textbox.outerHeight()/2-this.button.outerHeight()/2));t[u]=(p!==this.options.rtl)?(n[u]+this.options.spacingConstant):(n[s]-this.button.outerWidth()-this.options.spacingConstant);this.button.css(t)}},reload:function(a){this.textbox=b(a);this.button.off("click.textClear").on("click.textClear",b.proxy(this.buttonClickEvent,this));this.setPosition();this.textbox.on("keyup.textClear paste.textClear change.textClear",b.proxy(this.textChangeEvent,this));this.textChangeEvent()},destroy:function(){this.button.off("click.textClear");this.textbox.off("keyup.textClear paste.textClear change.textClear");this.textbox.removeAttr("style");if(this.options.absolutePosition){this.textbox.unwrap();this.button.remove();this.container.remove()}this.container=null;this.button=null;this.buttonClickEvent=null;b(this).removeData("textclearinstance")}});b.fn.textClear=function(e){if(typeof e==="string"){var a=b(this).data("textclearinstance"),f=Array.prototype.slice.call(arguments,1);return a[e].apply(a,f)}else{return this.each(function(){var d=b(this).data("textclearinstance");if(d){if(e){b.extend(d.options,e)}d.reload(this)}else{var c=b.extend({},e,b(this).data("textclear")||{});b(this).data("textclearinstance",new b.textClear(this,c))}})}};b(function(){b("[data-textclear]").textClear()})}(jQuery));