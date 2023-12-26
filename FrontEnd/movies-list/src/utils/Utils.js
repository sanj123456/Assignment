export const objectToFormData = (objFile) => {
    const newFormData = new FormData();
    for (var key in objFile) {
        newFormData.append(key, objFile[key]);
    }
    return newFormData
}