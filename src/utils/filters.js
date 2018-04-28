// 性别过滤
exports.gender = (item) => {
    switch (item) {
        case true:
            return '男';
        case false:
            return '女';
    }
};