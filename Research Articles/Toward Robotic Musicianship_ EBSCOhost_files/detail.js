var ep = window.ep || {}; ep.bundles = ep.bundles || []; ep.bundles = ep.bundles.concat('bundled/ehost/page/detail.js','ep/controller/control/imagequickview.js', 'ep/eprecordpreviewhover.js', 'ep/widgets/eppanel.js', 'ep/util/form.js', 'ep/controller/page/citationcontroller.js', 'ep/controller/control/foldertool.js', 'ep/controller/control/bookjackets.js');
ep.register("ep.controller.control.ImageQuickView",function(k){var h=function(a){ep.debug("ep.controller.control.ImageQuickView.onIQVLinkClick");a.preventDefault();var b=k(a.target).data("iqvargs");if(b){m(ep.controller.control.ImageQuickView.thumbnailType,b)}};function l(a){ep.debug("ep.controller.control.ImageQuickView.setEvents");var b=k("a[id^='linkQuikView']");if(b.length){if(a){b.unbind()}else{b.click(h)}}}function j(c,b){ep.debug("ep.controller.control.ImageQuickView.setAjaxActivity");var a=k("#ajaxActivity_"+b);if(a.length){a.css({display:(c)?"inline":"none"})}}function m(b,c){ep.debug("ep.controller.control.ImageQuickView.getThumbnails");var a=c.itemId;var e=("tContainer2_"+a);j(true,a);if(k("#"+e).is(":empty")){var d={theThumbnailType:b,SearchTerm:c.searchTerm,DB:c.db,ParentUI:c.an,Tag:c.tag,theSearchData:c.searchData};var f=ep.utilities.buildAjaxRequestPath("ImageQuickView/GetThumbnails");k.ajax({type:"POST",url:f,data:d,context:this,success:function(g){n(e,g)}})}else{n(e)}}function n(b,a){ep.debug("ep.controller.control.ImageQuickView.processThumbnailData");var e=k("#"+b);var c=b.split("_")[1];var f=k("#linkQuikView11_"+c);var d=k("#linkQuikView21_"+c);var g=k("#linkQuikView22_"+c);if(e.is(":visible")){e.hide();f.css({display:"inline"});d.css({display:"none"});g.parent().css({display:"none"})}else{e.show();f.css({display:"none"});d.css({display:"inline"});g.parent().css({display:"inline"})}if(e.is(":empty")){e.html(a)}j(false,c)}function i(){ep.debug("ep.controller.control.ImageQuickView.Initialize");ep.getInstance("ep.utilities");l(false);k(window).unload(k.proxy(function(){l(true)},this))}ep.domLoad(i)}(jQuery));(function(b){ep.dialog.RecordPreview=function(){var x={};function v(d){var c=jQuery(".json-data",d);if(!c.length){return null}var e=jQuery.parseJSON(c[0].firstChild.nodeValue);e.theHoverElement=d;return t(e,null,true)}function u(e){var k=null;var l=e+1;var g="";var f=jQuery("#hoverPreview"+l).data("hoverpreviewjson");if(f){var i=null;if(f.resultListId||f.archiveNoteItemId){i=ep.utilities.buildAjaxRequestPath("Detail/HoverPreview");g=f.resultListId}else{if(f.db&&f.tag&&f.term){i=ep.utilities.buildAjaxRequestPath("Detail/HoverPreview",{Db:f.db,Tag:f.tag,Term:f.term})}}var d=jQuery("#hoverPreview"+l).parent().parent("ol").hasClass("related-info-list");var h=jQuery("#hoverPreview"+l).attr("targetid");var j=jQuery("#hoverPreview"+l).data("reasontext");var c={theIsRelatedInfo:d,theTargetId:h,theResultListId:g,isNovList:f.isNovList};if(f.archiveNoteItemId){c.theArchiveNoteItemId=f.archiveNoteItemId}if(f.isNote){c.theIsNote=f.isNote}jQuery.ajax({url:i,data:c,async:false,success:function(m){k=t(m,e,j)}})}return k}function t(i,f,l){var m="";m+="<dl class=\"preview-detail\" data-auto='preview_detail'";if(i.ExtendedMarkupInfo&&i.ExtendedMarkupInfo!=""){m+="data-extmarkup='"+i.ExtendedMarkupInfo+"'"}m+=">";var h;var g;var e;if(i.IgnoreProperties){h="Title";g=i.DisplayValues[h];e=h;m+="<dt data-auto='preview_detail_title_hidden'";m+=' class="hidden"';m+=">"+e+":</dt><dd";m+=" data-auto='preview_detail_title' class=\"title-link\"";if(false){m+='href="'+b(i.theHoverElement).parent().find("a").attr("href")+'"'}else{m+='href="#"'}m+=">"+w(i,g,b(i.theHoverElement).parent().find("a").attr("href"))+"</dd>";i.IgnoreProperties.push("Title")}if(l){i.DisplayValues.Reason=l+i.RecommendationFeedbackTag}for(h in i.DisplayValues){if(typeof i.DisplayValues[h]!=="function"){if(n(i.IgnoreProperties,h)){continue}g=i.DisplayValues[h];if(g&&g.length>0){e=h;if(_.isArray(g)){g=q(g)}if(ep.clientData.hoverPreviewLabelData[h]){e=ep.clientData.hoverPreviewLabelData[h]}m+="<dt data-auto='preview_detail_info_label'";if(h==="Title"){m+=' class="hidden"'}m+=">"+e+":</dt><dd data-auto='preview_detail_info_value'";if(h==="Title"){m+=' class="title-link"';m+=">"+w(i,g)+"</dd>"}else{m+=">"+g+"</dd>"}}}}m+="</dl>";if(i.HeaderLinks||i.FooterLinks){m+="<div class=\"hover-links\" data-auto='preview_detail_links'>"}var k=i.HeaderLinks;if(k&&k.length>0&&i.TargetId){for(var c=0;c<k.length;c++){m+=p(i.TargetId,k[c])}}else{if(i.ResultListIndex){m+=s(i.ResultListIndex)}}if(ep.dialog.RecordPreview.isShowFolderLink){m+=o(f,i)}var z=i.FooterLinks;if(z&&z.length>0&&i.TargetId){for(var d=0;d<z.length;d++){m+=p(i.TargetId,z[d])}}else{if(i.ResultListIndex){m+=r(i.ResultListIndex,"record-type format-citation",ep.clientData.hoverPreviewLabelData.FullCitation,true);var j=document.getElementById("externalLinks"+i.ResultListIndex);if(j&&j.innerHTML&&j.innerHTML.length>0){m+='<div class="hover-external-links" data-auto="preview_detail_external_links">'+j.innerHTML+"</div>"}}}m+="</div>";if(ep.isPageRTL()){m=ep.utilities.bidiSanitizeContent(m)}return m}function w(g,h,d){if(g.ResultListIndex){return r(g.ResultListIndex,"",h,false)}else{if(g.FooterLinks){var c=g.FooterLinks;if(c&&c.length>0&&g.TargetId){for(var e=0;e<c.length;e++){if(c[e].Args==="Citation"||c[e].Text==="Retrieve Item"){var f=jQuery.extend({},c[e]);f.CssClass="";f.Text=h;return p(g.TargetId,f)}}}return null}else{var i="";if(d){i+='<a href="'+d+"\" data-auto='title_link'>"+h+"<a/>"}else{i=h}return i}}}function q(c){var d=c[0];b.each(c,function(f,e){if(f>0){d+="; "+e}});return d}function n(c,d){if(!c){return false}return _.indexOf(c,d)>-1}function o(f,j){var g="hover-add-folder";var d=ep.clientData.hoverPreviewLabelData.AddToFolder;var e=!j.RecordHasEISExtLink?ep.clientData.hoverPreviewLabelData.AddToFolderTitle:ep.clientData.hoverPreviewLabelData.AddExternalRecToFolder;var h=false;if(j.ResultListIndex){var i=document.getElementById("add_"+j.ResultListIndex);if(i&&i.style.display==="none"){h=true}}else{h=j.IsInFolder}if(h){g="hover-remove-folder";if(ep.dialog.isShowAddFolderPopup){d=ep.clientData.hoverPreviewLabelData.AddRemoveToFolder;e=ep.clientData.hoverPreviewLabelData.AddRemoveToFolderTitle}else{d=ep.clientData.hoverPreviewLabelData.RemoveFromFolder;e=!j.RecordHasEISExtLink?ep.clientData.hoverPreviewLabelData.RemoveFromFolderTitle:ep.clientData.hoverPreviewLabelData.RemoveExternalRecFromFolder}}var c="";if((window.location.href.indexOf("/folder?")<0)&&(!j.NoteContentType)){if(ep.dialog.isShowAddFolderPopup){c+='<a data-auto="hover_folder_link" class="{cssclass}" id="hover_folder" href="#" onclick="ep.dialog.RecordPreview.showFolderPopup(event, {dataIndex})" title="{titleText}"><span data-auto="hover_folder_icon" class="icon"></span>{text}</a>'}else{c+='<a data-auto="hover_folder_link" class="{cssclass}" id="hover_folder" href="#" onclick="return ep.dialog.RecordPreview.toggleHoverFolderLink(this,{dataIndex},{rlindex},{RecordHasEISExtLink});" title="{titleText}"><span data-auto="hover_folder_icon" class="icon"></span>{text}</a>';c=c.replace(/\{rlindex\}/g,j.ResultListIndex?j.ResultListIndex.toString():"null")}c=c.replace(/\{dataIndex\}/,f.toString());c=c.replace(/\{RecordHasEISExtLink\}/,j.RecordHasEISExtLink);c=c.replace(/\{cssclass\}/,g);c=c.replace(/\{text\}/g,d);c=c.replace(/\{titleText\}/g,e)}else{c+='<span data-auto="hover_remove_folder_icon" class="hover-remove-folder"><span class="icon"></span>';c+=ep.clientData.hoverPreviewLabelData.FolderItem;c+="</span>";c=c.replace(/\{text\}/,d);c=c.replace(/\{titleText\}/,e)}return c}function p(e,c){var d="<a data-auto='citation_link' href=\"";if(c.DoPostBack===true){d+="javascript";d+=":__doPostBack('";d+=e;d+="','"+c.Args+"');"}else{if(c.Args.indexOf("url=http")>-1){d+=c.Args;d+='" target="_blank'}else{d+=c.Args+'"'}}if(c.CssClass&&c.CssClass.length>0){d+='" class="'+c.CssClass}d+='">'+c.Text;d+="</a>";return d}function r(f,e,c,d){var g=document.getElementById("Result_"+f);var h;if(g){if(g.getAttributeNode("onclick")===null){h="<a data-auto='citation_link' href=\""+g.getAttribute("data-href")+'" onclick="'+a(g.getAttributeNode("data-onclick").nodeValue,c,f,d)}else{h="<a data-auto='citation_link' href=\""+g.getAttribute("href")+'" onclick="'+a(g.getAttributeNode("onclick").nodeValue,c,f,d)}h+='" class="'+e+'">'+c+"</a>"}return h}function a(e,c,f,d){var g=e;if(d){g="__doLinkPostBack('','target~~fulltext||args~~";g+=f;g+="',''); return false;"}return g}function s(f){var i="";var g=jQuery("#formats"+f);if(g.length){var h=jQuery(g).clone();if(jQuery.trim(h.html())===""){var e=jQuery("#smartlinkft"+f);if(e&&e.length){h.append(e[0].outerHTML)}var c=jQuery("#htmlft"+f);if(c&&c.length){h.append(c[0].outerHTML)}var d=jQuery("#pdfft"+f);if(d&&d.length){h.append(d[0].outerHTML)}var j=jQuery("#epubft"+f);if(j&&j.length){h.append(j[0].outerHTML)}}h.find("[id*='Download']").remove();h.find("[class*='requires-wma']").remove();h.find("[class*='audio-clip']").remove();i+=h.html()}return i}return{initPreviewHovers:function(e,c){ep.dialog.RecordPreview.isShowFolderLink=e;var d=jQuery('[id^="hoverPreview"]').length;for(var f=0;f<d;f++){var g="hoverPreview"+(f+1);var h=document.getElementById(g);if(h){ep.dialog.HoverPopup.addHover(g,f,u,c)}}},addSelfContainedRecordPreview:function(d,c){if(!x[d.id]){ep.dialog.HoverPopup.addHover(d,d,v,c)}x[d.id]=true},showFolderPopup:function(d,c){d.preventDefault();var h=c+1;var g=jQuery("#hoverPreview"+h).data("hoverpreviewjson");if(g){var f=false;var i=h?h:"";var e=jQuery("#add_"+i);if(e.length&&e.css("display")!=="none"){f=true}ep.controller.control.AddToFolderPopup.showAddToFolderPopup(d,{theResultId:i,theIsResultList:true,theIsResultHover:true,theIsToggleIcon:f})}},toggleHoverFolderLink:function(d,c,f,g){var h=c+1;var j=jQuery("#hoverPreview"+h).data("hoverpreviewjson");if(j){var i=d.className==="hover-add-folder";if(f!==null){ep.folder.toggleFolderItem(f,i)}else{if(j){var e=ep.utilities.buildAjaxRequestPath("Folder/SetRouteKeyFolderJson",{Db:j.db,Tag:j.tag,Term:j.term});jQuery.ajax({url:e,async:false,success:function(k){ep.folder.toggleFolderItem(f,i,k)}})}}if(i){d.title=!g?ep.clientData.hoverPreviewLabelData.RemoveFromFolderTitle:ep.clientData.hoverPreviewLabelData.RemoveExternalRecFromFolder;d.innerHTML='<span class="icon" data-auto="hover_folder_icon"></span>'+ep.clientData.hoverPreviewLabelData.RemoveFromFolder;d.className="hover-remove-folder";j.IsInFolder=true}else{d.title=!g?ep.clientData.hoverPreviewLabelData.AddToFolderTitle:ep.clientData.hoverPreviewLabelData.AddExternalRecToFolder;d.innerHTML='<span class="icon" data-auto="hover_folder_icon"></span>'+ep.clientData.hoverPreviewLabelData.AddToFolder;d.className="hover-add-folder";j.IsInFolder=false}}return false}}}()})(jQuery);(function(b){b.widget("ui.eppanel",{options:{Panel:"#ToolPanelContent",Id:"",Url:"",Js:""},_eventNamespace:"",_panel:{},_isOpen:false,_isInProg:false,_panelUrl:"",_create:function(){ep.debug("eppanel:create");this._setNamespace();this._panel=b(this.options.Panel);var a=this;this._panel.find(".close-panel").bind("click",function(d){a._closeClickHandler(d)});this._panel.bind("panelReady"+this._eventNamespace,function(f,h,g){if(h!==a.options.Id){ep.debug("trigger: panelOnClose - "+a.options.Id);a._panel.trigger("panelOnClose",a.options.Id);a.destroy()}else{ep.debug("No longer in progress "+a.options.Id);a._inProg=false}});this._panel.bind("panelClose"+this._eventNamespace,function(e,f){if(f===a.options.Id){a._close()}})},_setNamespace:function(){if(this.options.Id&&this.options.Id.length>0){this._eventNamespace=".eppanel-"+this.options.Id}else{this._eventNamespace=".eppanel-"+Math.floor(Math.random()*1001)}},_init:function(){if(this._isOpen){ep.debug("trigger: panelOnClose - "+this.options.Id);this._panel.trigger("panelOnClose",this.options.Id);this._close()}else{this._open()}},_open:function(){ep.debug("eppanel:open "+this.options.Id);if(!this._isInProg){this._isInProg=true;this.element.parent().addClass("active bg-p2");this._setPanelUrl();this._getContent()}},_close:function(){ep.debug("eppanel:close "+this.options.Id);if(this._isOpen){this._panel.hide();this._panel.find(".close-panel").unbind();this._panel.resize();this.destroy();this._isOpen=false}},destroy:function(){ep.debug("eppanel:destroy "+this.options.Id);this.element.parent().removeClass("active bg-p2");b(document).unbind(this._eventNamespace);this._panel.unbind(this._eventNamespace);b.Widget.prototype.destroy.call(this);b(window).trigger("panelClose:resize",this.options.Id)},_closeClickHandler:function(a){this._close()},_setPanelUrl:function(){if(this.options.Url.indexOf("?")!==-1){var a=ep.utilities.buildRouteKey(ep.clientData.currentRecord.Db,ep.clientData.currentRecord.Term,ep.clientData.currentRecord.Tag);this._panelUrl=this.options.Url+"&recordKey="+a;if(ep.newReturnUrl){this._panelUrl+="&ReturnUrl="+encodeURIComponent(ep.newReturnUrl)}}else{this._panelUrl=ep.utilities.buildAjaxRequestPathWithNewReturn(this.options.Url,ep.clientData.currentRecord)}},_getContent:function(){var a=this;b.ajax({url:this._panelUrl,dataType:"html",success:function(d){a._updatePanel(d);a._loadJs();a._notify();a._panel.find(":tabbable").first().focus();a._isOpen=true;b(window).trigger("panelOpen:resize",a.options.Id)}})},_doEmptyWrapper:function(){var a=this._panel.children(".wrapper");if(a.children().length){a.empty()}},_updatePanel:function(d){var a=this._panel.children(".wrapper");this._doEmptyWrapper();a.append(d);if(ep.isPageRTL()){ep.utilities.bidiSanitizeContent(a.get(0))}this._panel.show();this._panel.find("a.close-panel").show();this._panel.resize()},_loadJs:function(){if(this.options.Js&&this.options.Js!==""){ep.require(this.options.Js)}},_notify:function(){ep.debug("trigger: panelReady - "+this.options.Id);this._panel.trigger("panelReady",this.options.Id)}});b(function(){b(document).delegate("[data-panel]","click",function(e){var f=b(e.currentTarget);var a=f.data("panel");f.eppanel(a);e.preventDefault();return false})})})(jQuery);(function(k){var h=function(a){var d=k(a).data("form").action;if(d){var e=k("<form>",{action:ep.utilities.replaceEPCommand(d),method:"POST"});var c=k("*",a).serializeArray();k.each(c,function(n,f){e.append(k("<input>",{type:"hidden",name:f.name,value:f.value}))});var b=k(a).data("inputs");if(b){k.each(b,function(n,f){e.append(k("<input>",{type:"hidden",name:n,value:f}))})}k("body").append(e);e[0].submit()}},i=13,l=32,j=1,g=0;k("[data-form]").live("click keydown",function(q){var r=q.which,b=false,c=k(this),s=c.data("form");if(q.target.type==="submit"||q.target.type==="button"||q.target.type==="image"){var f=k(q.target).data("default-textbox"),a;if(f){a=k(this).find("#"+f).val()}if(s.allowFormSubmit||((s.allowEmptySubmit||a!=="")&&(r===i||r===j||r===g))){b=true}}if(q.target.type==="text"){if(q.type==="keydown"&&r===i){if(s.allowEmptySubmit||q.target.value!==""&&r===i){b=true}}}if(b){if(s.checkResultsBeforeSubmit){var t={},d=k("*",this).serializeArray(),e=k(c).data("inputs");k.each(d,function(n,m){t[m.name]=m.value});if(e){k.each(e,function(n,m){t[n]=m})}k.ajax({url:ep.utilities.buildAjaxRequestPath(s.checkResultsUrl),type:"POST",data:ep.util.JSON.stringify(t),contentType:"application/json; charset=utf-8",dataType:"html",success:function(m){var n=c.siblings("[data-no-results]");if(m!==""){if(!n.length){c.after(k('<div data-no-results=""></div>').html(m))}}else{if(n.length){n.remove()}h(c,q)}},error:function(m){}})}else{h(c,q)}q.preventDefault();return false}})})(jQuery);ep.registerInstance("ep.controller.page.CitationController","ep.base.PageController",{onDomLoad:function(){this.initControls();this.setEvents()},onLoad:function(){_.defer(ep.loadImages)},initControls:function(){var b=jQuery("a[id^='linkQuikView']");if(b.length){ep.getInstance({epId:"ep.controller.control.ImageQuickView",thumbnailType:"THUMB_LARGE"})}if(jQuery("#column1").length){ep.getInstance({epId:"ep.controller.CollapsibleController",page:"citation"})}if(jQuery(".custom-widget").length){ep.getInstance({epId:"ep.controller.CustomWidgetController",page:"citation"});ep.getInstance({epId:"ep.controller.control.BookRelatedInformationController",page:"citation"});if(jQuery("body").hasClass("guest")){ep.getInstance({epId:"ep.controller.GuestLoginController",restrictedElements:[]})}}if(ep.clientData.restrictedElements){ep.getInstance({epId:"ep.controller.GuestLoginController",restrictedElements:ep.clientData.restrictedElements})}if(jQuery("#addThis").length&&ep.clientData.addThis){ep.require(ep.clientData.addThis.widgetUrl,function(){setTimeout(function(){addthis.init()},500)})}if(jQuery("html").attr("dir")==="rtl"){jQuery("#citationFields dd").bidi()}},setEvents:function(){this.setAddToFolderPopupEvents();this.setElementsVisibility();jQuery("#collapseall, #expandall").bind("click",function(){jQuery(".collapse-toggle").trigger("click",(this.id==="expandall"));return false});jQuery("#Subsidiaries").parent().next().bind("toggled",this.subsidiariesSectionLinkClick)},setElementsVisibility:function(){if(!jQuery("#widgetsAnchor").length&&jQuery("#widgetLink").length){jQuery("#widgetLink").hide()}},setAddToFolderPopupEvents:function(){if(ep.clientData.isShowAddFolderPopup){jQuery(".folder-delivery-item button").each(jQuery.proxy(function(c,d){d.click(jQuery.proxy(this.addToFolderPopupLinkClick,this))},this))}},addToFolderPopupLinkClick:function(c){var d=ep.getInstance({epId:"ep.controller.control.AddToFolderPopup",params:{theClickEvent:c,theIsDetail:true,isExternalCitation:ep.clientData.isExternalCitation,theRecordDetails:ep.clientData.theRecordDetails}});if(d){d.showAddToFolderPopup(c)}return false},subsidiariesSectionLinkClick:function(d){ep.require("_layout2/companyresults.css");var e=jQuery("#Subsidiaries");e.addClass("loading");jQuery.ajax({url:ep.utilities.getBaseRequestPath()+e.attr("href"),context:d.target,success:function f(c){e.removeClass("loading").unbind("click").parent().next().unbind("toggled").attr({href:"#"});var a=jQuery(this).find("table tbody"),b=jQuery(c);a.attr("aria-expanded","true").append(b);ep.getInstance("ep.controller.control.companyInfoResults",function(){ep.controller.control.companyInfoResults.init()})}});return false}});(function(b){b(function(){if(ep.clientData.isShowAddFolderPopup){ep.require("ep.controller.control.AddToFolderPopup")}b("[data-folder]").click(function(f){var a=b(this);var e=a.data("folder");if(ep.clientData.isShowAddFolderPopup){ep.controller.control.AddToFolderPopup.showAddToFolderPopup(f,{theIsDetail:true,isExternalCitation:ep.clientData.isExternalCitation,theRecordDetails:ep.clientData.theRecordDetails,theIsAbook:ep.clientData.isAbook,theIsEbook:ep.clientData.isEbook,theIsToggleIcon:true})}else{if(a.hasClass("cit-folder-control")||a.parent().hasClass("cit-folder-control")){ep.folder.toggleFolderItem(null,false,e,false);a.removeClass("cit-folder-control");a.parent().removeClass("cit-folder-control");a.attr("title",ep.messages.Add_to_folder);a.text(ep.messages.Add_to_folder);ep.folder.updateToolbarFolderCount(false)}else{ep.folder.toggleFolderItem(null,true,e,false);a.addClass("cit-folder-control");a.parent().addClass("cit-folder-control");a.attr("title",ep.messages.Remove_from_folder);a.text(ep.messages.Remove_from_folder);ep.folder.updateToolbarFolderCount(true)}}b(window).trigger("resizeToolsBar");return false})})})(jQuery);ep.register("ep.controller.control.BookJackets");ep.controller.control.BookJackets=(function(h){function e(c,a){var b=h(a);var d=b.data("book-jacket");if(d&&d.ThumbImageUrl&&d.ThumbImageUrl.length>0){h("<img />").load(function(){if(this.width>1||this.naturalWidth>1){b.prepend(h(this));h(this).wrapAll('<span class="bj-img"></span>');b.removeClass();if(d.Type===3){b.addClass("book-jacket-series")}else{b.addClass("book-jacket")}}else{h(this).remove()}}).attr({src:d.ThumbImageUrl,alt:d.ToolTip})}}function g(c,a){var b=h(a);var d=b.data("book-jacket");if(d&&d.ThumbImageUrl&&d.ThumbImageUrl.length>0){h("<img />").load(function(){if(this.width>1||this.naturalWidth>1){b.prepend(h(this));h(".pubtype-icon",b).remove();if(h.browser.msie){h(this).removeAttr("height").removeAttr("width")}h(this).attr("width","60px");h(this).attr("data-auto","book_jacket");b.removeClass("pubtype");if(d.Type===3){b.addClass("book-jacket-series")}else{b.addClass("book-jacket")}}else{h(this).remove()}}).attr({src:d.ThumbImageUrl,alt:d.ToolTip})}}function f(c,a){var b=h(a);var d=b.data("book-jacket");if(d&&d.ThumbImageUrl&&d.ThumbImageUrl.length>0){h("<img />").load(function(){if(this.width>1||this.naturalWidth>1){b.prepend(h(this));if(d.DetailImageUrl!==null&&h.trim(d.DetailImageUrl).length>0){h(this).wrapAll('<a href="'+d.DetailImageUrl+'" target="_blank"></a>')}if(h.browser.msie){h(this).removeAttr("height").removeAttr("width")}}else{h(this).remove()}}).attr({src:d.ThumbImageUrl,alt:d.ToolTip})}}return{loadResultBookJacketForMobile:function(a){h(a).find(".mobile-jacket[data-book-jacket]").each(e)},loadResultBookJacket:function(){h(".record-icon[data-book-jacket]").each(g)},loadDetailBookJacket:function(){h("#bookJacket[data-book-jacket]").each(f)},loadMobileResultBookJacket:function(){h(".mobile-jacket[data-book-jacket]").each(e)}}})(jQuery);(function(b){b(function(){ep.controller.control.BookJackets.loadDetailBookJacket();ep.controller.control.BookJackets.loadResultBookJacket();ep.controller.control.BookJackets.loadMobileResultBookJacket()})})(jQuery);