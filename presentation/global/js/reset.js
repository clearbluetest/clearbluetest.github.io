function clearLocalStorage() {
	if (window.localStorage == null)
		return;
	var pattern = "drcom/Clearblue";
	for ( var name in localStorage) {
		if (name.indexOf(pattern) != -1) {
			localStorage.removeItem(name);
		}
	}
}
clearLocalStorage();