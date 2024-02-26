export function scrollLock(bool) {
	if (bool) {
		document.body.style.overflow = "hidden";
	} else {
		document.body.style.overflow = "auto";
	}
}
