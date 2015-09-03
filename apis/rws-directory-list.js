var path = require('path'),
	request = require('request'),
	parseString = require('xml2js').parseString,
	translator = require('./rws-res');

module.exports = function (req, res, next) {
	request({
		url: 'http://cma.rwsentosa.com/Service.svc/GetUSSContent',
		method: 'GET',
		qs: {
			LanguageID: '1',
			filter: 'Show,Ride',
			Latitude: '1.254036',
			Longitude: '103.823822'
		}
	}, function (error, response, body) {
		if (!body) {
			return res.json({error: true});
		}

		parseString(body, function (error, result) {
			var zones = [];
			result.ResponseOfUSS.Result[0].USSZoneList[0].USSZone.forEach(function(zone) {
				var nameChinese = translator.zoneName[zone.USSZoneID[0]];
				var clientZone = {
					name: nameChinese ? nameChinese : zone.Name[0],
					banner: translator.zoneBanner[zone.USSZoneID[0]],
					contents: []
				};

				zone.Content[0].USSContent.forEach(function(content) {
					var chineseName = translator.contentName[content.SID[0]];

					clientZone.contents.push({
						name: chineseName ? chineseName : content.Name[0],
						showTime: content.ShowTime[0],
						queueTime: content.QueueTime[0],
						iconUrl: 'http://cma.rwsentosa.com/' + content.ThumbnailURL[0]
					});
				});

				zones.push(clientZone);
			});

			res.json(zones);
		});
	});
}