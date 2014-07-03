window.location.search.slice(1).split("&").map(function(item) {
	var parts = item.split("=");
	var hash = [];
	hash[part[0]] = part[1];
	return hash;

return {key: parts[0], value: parts[1]};
});
