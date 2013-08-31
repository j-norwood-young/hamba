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
				//emit(key, { semantic: this.semantic[x], utime: this.utime });
			}
		}
		for(var x = 0; x < people.length; x++) {
			emit(people[x], { docs : [{time : this.utime, cities : cities}] } );
		}
	},
	function(key, values) {
		var docs = []
		for (emit in values) {
			var tmp = values[emit].docs;
			for (docid in tmp) {
				docs.push(tmp[docid])
			 }
		}
		return {
			docs : docs
		}

		return { cities: values };
		return {
			_id : key,
			docs : values
		}
		// return values[0];
	},
	{
		query: { "semantic._type": "Person", "semantic._type": "City"  },
		out: "reduce_test",
		finalize: function(key, reducedVal) {
			return reducedVal;
		}
	}
)