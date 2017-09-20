// https://stackoverflow.com/posts/901144/edit
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$.ajaxSetup({
    type: "GET",
    data: {},
    dataType: 'json',
    xhrFields: {
       withCredentials: true
    },
    crossDomain: true
});

function RenderControlBar() {
	var baseUrl = cfg.SERVER_BASE;
	$('head').append('<link rel="stylesheet" href="' + baseUrl + '/controlpanel/Styles/admin.css" type="text/css" />');
	$('<div class="admin-panel"/>')
		.appendTo('body')
		.load(baseUrl + "/" + cfg.storename + "/admin/controlbar", function() {
			$('.sidebar-wrapper .sidebar-menu a').attr('href', (n, old) => baseUrl + old);
			$('.admin-panel img').attr('src', (n, old) => baseUrl + old);
		});
}

function RenderMenu() {
	// Place this call here so that not to modify every page again
	RenderControlBar();
	
	$('<ul/>')
		.appendTo('body')
		.append($('<li/>').append($('<a/>', {href: 'home.htm', text: 'Home'})))
		.append($('<li/>').append($('<a/>', {href: 'events.htm', text: 'Events'})))
		.append($('<li/>')
			.append($('<a/>', {href: 'about.htm', text: 'About'}))
			.append($('<ul/>')
				.append($('<li/>').append($('<a/>').attr('href', 'availablepositions.htm').text('Available Positions')))
			)
			.append($('<ul/>')
				.append($('<li/>').append($('<a/>').attr('href', 'teammember.htm').text('Team Member')))
			)
		)
		.append($('<li/>')
			.text('Community')
			.append($('<ul>')
				.append($('<li/>').append($('<a/>').attr('href', 'donationrequest.htm').text('Donation Request')))
				.append($('<li/>').append($('<a/>').attr('href', 'fundraising.htm').text('Fundraising')))
			)
		);
}

function RenderEvents(json) {
	$('<ul/>')
		.appendTo('body')
		.append(
			json.map(function(i) {
				var d = eval("new " + i.StartDate.replace(/\//g, ''));
				var sDate = [].concat.apply([], [d.getFullYear(), [d.getMonth() + 1, d.getDate()].map(d => ('0' + d).slice(-2))]).join('-');
				var url = cfg.SERVER_BASE + "/" + cfg.storename + "/admin/apps/cms/editevents/" + sDate;
				return $('<li/>').append($('<a/>', {href: url, text : i.Title + ' (' + sDate + ')'}));
			})
		);
}

function RenderTextArea(jsonFragment) {
	// render to the user
	var $el = (function(obj) {
		 return $('<span/>', {text: obj.TextContent})
			.appendTo('body')
			.wrap('<div/>')
			.parent()
			.css('position', 'relative')
			.end();
	})(jsonFragment.ContentItems[0]);
	
	// add markup for the operator
	if(isAdmin) {
		RenderEditOverlay($el, jsonFragment);
	}
}

function RenderImageArea(jsonFragment) {
	// render to the user
	var $img = (function(oImage) {
		 return $('<img/>', {src: cfg.SERVER_BASE + oImage.ImagePath})
			.appendTo('body')
			.wrap('<div/>')
			.parent()
			.width(oImage.ImageWidth)
			.height(oImage.ImageHeight)
			.css('position', 'relative')
			.end();
	})(jsonFragment.ContentItems[0]);
	
	// add markup for the operator
	if(isAdmin) {
		RenderEditOverlay($img, jsonFragment);
	}
}

function RenderAnnouncement(obj) {
	$el = $('<div class="announcement-item-body"/>')
		.appendTo('body')
		.wrap($('<div class="announcement-item item active"/>', {id: obj.Id}).css('position', 'relative'))
		.append($('<div class="title"/>')
			.append($('<p/>', {text: obj.Title}))
		)
		.append($('<div class="media-body"/>')
			.append($('<div class="media-right image"/>')
				.append($('<img/>', {src: cfg.SERVER_BASE + obj.SideImage.ImagePath}))
			)
			.append($('<div class="text media-body"/>')
				.append($('<p/>').text(obj.Intro))
				.append($('<p class="read-more"/>', {
						onclick: 'helpers.dialogs.showAnnouncementDetail("' + obj.Id + '");',
						text: 'Read more'}
					)
				)
			)
		);
	
	if(isAdmin) {
		RenderEditOverlayForAnnouncements($el);
	}
}

function RenderEditOverlayForAnnouncements($control) {
	var id = 'anneditoverl';
	$control.wrap('<div/>').parent().attr('id', id);

	showEditButtonOverlay(id, "EDIT", "window.location.href = '" + cfg.SERVER_BASE + "/" + cfg.storename + "/admin/apps/cms/starteditannouncements?pid=0';");
}


function RenderEditOverlay($control, obj) {
	var id = 'ctl_' + obj.Type + '_' + obj.StoreId + '_' + obj.PageId + '_' + obj.PlaceholderId;
	$control.wrap('<div/>').parent().attr('id', id);
	
	showEditButtonOverlay(id,
		"EDIT",
		"EditImageArea('" + id + "', '"
			+ ('IMAGE' == obj.Type ? 'BIGBANNER' : 'text') + "', "
			+ obj.PageId + ", "
			+ obj.PlaceholderId + ", "
			+ obj.StoreId + ", "
			+ "'javascript:hideLightBox();', 'javascript:hideLightBox();');"
	);
}

function EditImageArea(areaid, imageType, pageId, controlId, storeId, closeaction, cancelaction) {
    window.location.href = cfg.SERVER_BASE + "/" + cfg.storename + "/admin/apps/cms/startedit?etype=" + imageType + "&pid=" + pageId + "&cid=" + controlId;
}

var cfg = {
	SERVER_BASE: 'http://f4.cfarestaurant.com',
	JSON_BASE: 'http://f4.features.cfarestaurant.com.s3.amazonaws.com/storefront/stores',
	storename: 'bakerlane',
};

(function() {
  var storefrontJSON = cfg.JSON_BASE + '/' + cfg.storename + '/' + cfg.storename + '.jsonp?jsoncallback=?';
  $.getJSON(storefrontJSON);
})();