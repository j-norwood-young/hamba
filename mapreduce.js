db.feeds.mapReduce(
	function() { 
		var people = [];
		var cities = [];
		for(var x = 0; x < this.semantic.length; x++) {
			if (this.semantic[x]._type == "Person") {
				people.push(this.semantic[x].name);
			}
		}
		for(var x = 0; x < this.semantic.length; x++) {
			if (this.semantic[x]._type == "City") {
				var latitude = null;
				var longitude = null;
				if (this.semantic[x].resolutions) {
					var resolutions = this.semantic[x].resolutions.pop();
					latitude = resolutions.latitude;
					longitude = resolutions.longitude;
				}
				cities.push({ name: this.semantic[x].name, latitude: latitude, longitude: longitude });
			}
		}
		for(var x = 0; x < people.length; x++) {
			emit(people[x], { docs : [{time : this.utime, cities : cities}] } );
		}
	},
	function(key, values) {
		var docs = []
		for (emit1 in values) {
			var tmp = values[emit1].docs;
			for (docid in tmp) {
				docs.push(tmp[docid])
			 }
		}
		return {
			docs : docs
		}
	},
	{
		query: { "semantic._type": "Person", "semantic._type": "City"  },
		out: "reduce_test",
		finalize: function(key, reducedVal) {
			return reducedVal;
		}
	}
)