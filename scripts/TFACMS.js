function SiteImage(Id, filepath, width, height, type) {
    this.ID = Id;
    this.filepath = filepath;
    this.width = width;
    this.height = height;
    this.type = type;
}
var lbEditTemplate = '';
var lbEditTabsTemplate = '';
var lbInfoTemplate = '';
var ActiveEditor = '';

function LightBoxButton(id, text, action) {
    this.id = id
    this.text = text
    this.action = action
}

function showLightBox(Buttons, lbType, contentType, content, id, width, height, title, description, closeaction) {
    if (width == 10000) {
        var mes = GetMaxEditorSize(0, 120);
        width = mes.width;
        if (height == 10000) {
            height = mes.height;
        }
    }

    var template = '';
        switch (lbType) {
            case "edit":
                if (lbEditTemplate == '') {
                    lbEditTemplate = getViewTemplate('Shared', 'LightBox', 'view_editlightbox', '', '');
                }
                 template = lbEditTemplate;
                 
                 break;
             case "edittabs":
                 if (lbEditTabsTemplate == '') {
                     lbEditTabsTemplate = getViewTemplate('Shared', 'LightBox', 'view_editlightboxtabs', '', '');
                 }
                 template = lbEditTabsTemplate;
                 break;                
            case "info":
                if (lbInfoTemplate == '') {
                    lbInfoTemplate = getViewTemplate('Shared', 'LightBox', 'view_infolightbox', '', '');
                }
                template = lbInfoTemplate;
                break;
        }
        
        switch (contentType) {
            case "inline":
                break;
            case "frame":
                break;
            default:
                alert('no lbtype');
        }

    var data = {
        "editorwidth": width,
        "editorheight": height,
        "title": title,
        "subtitle": description,
        "finishaction": "",
        "closeaction": closeaction,
        "nextaction": "",
        "previousaction": "",
        "Buttons": Buttons
    };
    $('#V2editBackground').show();
    $('#V2editControl').empty();
    var result = TrimPath.parseTemplate(template).process(data).replace("<---CONTENT--->", content);
    document.getElementById('V2editControl').innerHTML = result;
    $('#V2editControl').show();
    centerObject('V2editControl');
}

function hideLightBox() {
    document.getElementById('V2editControl').innerHTML = "";
     $('#V2editControl').fadeOut('slow', function() {
     $('#V2editBackground').fadeOut().empty();
  });
}

function showLoadingMessage() {
    $('#V2editBackground').show();
    document.getElementById('V2editControl').innerHTML = "<div style='height:40px;width:200px;background-color:#CCCCCC;padding-left:70px;padding-top:14px;'>Loading...</div>" ;
    $('#V2editControl').show();
    centerObject('V2editControl');
}
function hideLoadingMessage() {
    document.getElementById('V2editControl').innerHTML = "";
    $('#V2editControl').hide(); 
    $('#V2editBackground').hide();
}


function GetScrollYPos() {
    var y = 0;
    if (typeof (window.pageYOffset) == 'number') {
        // Netscape
        y = window.pageYOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        // DOM
        y = document.body.scrollTop;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        // IE6 standards compliant mode
        y = document.documentElement.scrollTop;
    }
    return y;
}

function GetScrollXPos() {
    var x = 0;
    if (typeof (window.pageYOffset) == 'number') {
        x = window.pageXOffset;
    } else if (document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        x = document.body.scrollLeft;
    } else if (document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
        x = document.documentElement.scrollLeft;
    }
    return x;
}

function centerObject(divname) {
        var x = GetScrollXPos();
        var y = GetScrollYPos();
        var windowWidth = document.documentElement.clientWidth;
        var windowHeight = document.documentElement.clientHeight;
        var popupHeight = document.getElementById(divname).offsetHeight;
        var popupWidth = document.getElementById(divname).offsetWidth;
        var top = (windowHeight / 2 - popupHeight / 2) + y;
        var left = (windowWidth / 2 - popupWidth / 2) + x;
        if (top < 0) {
            top = 0;
        }
        if (left < 0) {
            left = 0;
        }
        document.getElementById(divname).style.top = top + 'px';
        document.getElementById(divname).style.left = left + 'px';
        document.getElementById(divname).style.position = 'absolute';
    }

function GetMaxEditorSize(widthoffset, heightoffset) {
    var myWidth = 0, myHeight = 0;
    if (typeof (window.innerWidth) == 'number') {
        //Non-IE
        myWidth = window.innerWidth;
        myHeight = window.innerHeight;
    } else if (document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
        //IE 6+ in 'standards compliant mode'
        myWidth = document.documentElement.clientWidth;
        myHeight = document.documentElement.clientHeight;
    } else if (document.body && (document.body.clientWidth || document.body.clientHeight)) {
        //IE 4 compatible
        myWidth = document.body.clientWidth;
        myHeight = document.body.clientHeight;
    }

    if (myWidth > 980) {
        myWidth = 980;
    }
    var maxEditorSize = { "width": myWidth - 10 - widthoffset, "height": myHeight - 10 - heightoffset };
    return maxEditorSize;
}

function clone_obj(obj) {
    var c = obj instanceof Array ? [] : {};

    for (var i in obj) {
        if (i != '__type') {
            var prop = obj[i];

            if (typeof prop == 'object') {
                if (prop instanceof Array) {
                    c[i] = [];

                    for (var j = 0; j < prop.length; j++) {
                        if (typeof prop[j] != 'object') {
                            c[i].push(prop[j]);
                        } else {
                            c[i].push(clone_obj(prop[j]));
                        }
                    }
                } else {
                try {
                    if (prop.getMonth) {
                        c[i] = prop;
                    } else {
                        c[i] = clone_obj(prop);
                    }
                }
                catch (ex) {
                    c[i] = clone_obj(prop);
                }
                }
            } else {
                c[i] = prop;
            }
        }
    }

    return c;
}

function centerDiv(divname) {
    var x = GetScrollXPos();
    var y = GetScrollYPos();
    var windowWidth = document.documentElement.clientWidth;
    var windowHeight = document.documentElement.clientHeight;
    var popupHeight = $(divname).height();
    //document.write(document.getElementById(divname.replace('#', '')).innerHTML);
    var popupWidth = $(divname).width();
    $(divname).css({ "position": "absolute", "top": (windowHeight / 2 - popupHeight / 2) + y, "left": (windowWidth / 2 - popupWidth / 2) + x });
    $("#editBackground").css({ "height": windowHeight });
}

function clone_obj(obj) {
    var c = obj instanceof Array ? [] : {};

    for (var i in obj) {
        if (i != '__type') {
            var prop = obj[i];

            if (typeof prop == 'object') {
                if (prop instanceof Array) {
                    c[i] = [];

                    for (var j = 0; j < prop.length; j++) {
                        if (typeof prop[j] != 'object') {
                            c[i].push(prop[j]);
                        } else {
                            c[i].push(clone_obj(prop[j]));
                        }
                    }
                } else {
                    try {
                        if (prop.getMonth) {
                            c[i] = prop;
                        } else {
                            c[i] = clone_obj(prop);
                        }
                    }
                    catch (ex) {
                        c[i] = clone_obj(prop);
                    }
                }
            } else {
                c[i] = prop;
            }
        }
    }

    return c;
}

var $el, $tempDiv, $tempButton, divHeight = 0;

function Showresult() {
    return false;
}
function showEditButtonOverlay(elemid, text, url) {
        $el = $('#' + elemid).css("border-color", "white");
        divHeight = $el.height() + parseInt($el.css("padding-top")) + parseInt($el.css("padding-bottom"));

        var test = "test";
        $tempDiv = $("<div />", {
            "class": "overlay"
        });

        $tempButton = $("<span  />", {
            "text": text,
            "class": "widget-button rounded",
            "css": {
                "top": (divHeight / 2) - 7 + "px"
                
            }
        }).appendTo($tempDiv);

        $tempDiv.click(function() {
            eval(url);
        });
        $tempDiv.appendTo($el);

        
}


function newLink(type, destination, info) {
    this.LinkType = type;
    this.Destination = destination;
    this.LinkInfo = info;
}

function GetNewEvent(id, storeid, title, description, startdate, enddate, starttime, endtime) {
    this.Id = id;
    this.Title = title;
    this.Description = description;
    this.StartDate = startdate;
    this.EventDate = '';
    this.EndDate = enddate;
    this.StartTime = starttime;
    this.EndTime = endtime;
    this.MoreInfo = '';
    this.EventGroup = '0';
    this.ImageId = 0;
    this.ImagePath = '';
    this.StoreId = storeid;
    this.AllDay = false;
    this.AllowRSVP = false;
    this.HasMoreInfo = false;
    this.TotalReservation = 0;
    this.MoreDetail = new GetNewMoreInfo('', '', '', '', 0, '', 0);
    this.HasTimeSlots = false;
    this.MaxGroupSize = 0;
    this.Timeslots = new Array();
    
    
}

function GetNewAnnouncement(title, intro, description, sideimagepath, sideimageid, mainimagepath, mainimageid) {
    this.Title = title;
    this.Intro = intro;
    this.ShortDescription = description;
    this.SideImageId = sideimageid;
    this.SideImagePath = sideimagepath;
    this.MainImageId = mainimageid;
    this.MainImagePath = mainimagepath;
    this.SideImageWidth = 0;
    this.SideImageHeight = 0;
    this.MainImageWidth = 0;
    this.MainImageHeight = 0;
}


function GetImage(Id, IPath, IWidth, IHeight, IType, IOwnerId) {
    this.Id = Id;
    this.IPath = IPath;
    this.IWidth = IWidth;
    this.IHeight = IHeight;
    this.IType = IType;
    this.OwnerId = IOwnerId;
}

function DoFlashLink(ltype, ldest, linfo) {
    switch (ltype) {
        case "sitepage":
            window.location.href = ldest;
            break;
        case "webpage":
            window.open(ldest);
            break;
        case "download":
            window.open('/coreresources/filedownload.aspx?sid=' + activeStoreId + '&fid=' + ldest);
            break;
        case "event":
            
            window.open('events/' + ldest);
            break;        
        case "photo":
            window.open('photo/' + ldest);
            break;            
        case "announcement":
            ShowAnnouncementDetail(ldest);
            break;
    }
}

function GetNewMoreInfo(title, intro, description, sideimagepath, sideimageid, mainimagepath, mainimageid) {
    this.Id = 0;
    this.StoreId = 0;
    this.Title = title;
    this.Intro = intro;
    this.ShortDescription = description;
    this.SideImageId = sideimageid;
    this.SideImagePath = sideimagepath;
    this.MainImageId = mainimageid;
    this.MainImagePath = mainimagepath;
    this.SideImageWidth = 0;
    this.SideImageHeight = 0;
    this.MainImageWidth = 0;
    this.MainImageHeight = 0;
}