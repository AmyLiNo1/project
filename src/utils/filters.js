// 性别过滤
exports.gender = (item) => {
    switch (item) {
        case 0:
        case '0':
            return '男';
        case 1:
        case '1':
            return '女';
    }
};