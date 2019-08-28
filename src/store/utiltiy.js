export const updateObject = (oldObject, updateProperties) => {
    return {
        ...oldObject,
        ...updateProperties,
    };
};

export const updateArray = (oldArray, newElement) => {
    return oldArray.concat(newElement);
}