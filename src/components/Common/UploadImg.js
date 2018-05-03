import { Upload, Icon, message } from 'antd';

const UploadImg = ({ imageUrl, updateConfig }) => {
    const uploadButton = (
        <div>
            <Icon type={loading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
        </div>
    );
    let loading = false

    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    function beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }
    function handleChange(info, info1, info2) {
        if (info.file.status === 'uploading') {
            loading = true
            return;
        }
        if (info.file.status === 'done') {
            imageUrl = imageUrl;
            loading = false
            updateConfig({
                avatar: `http://cloud1.gaitubao.net/${info.file.response.key}`
            })
        }
    }

    return (
        <div>
            <Upload
                name="file"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/qiniu"
                beforeUpload={beforeUpload}
                onChange={handleChange}
                data= {{token: 'fzcUMJCCZi3qU_PwAHKGXQGTt5k_Xyr3B-3i2H-C:-MT8iUigTyo0dgt2rTGrVkeLgRA=:eyJyZXR1cm5VcmwiOiIiLCJyZXR1cm5Cb2R5Ijoie1wia2V5XCI6ICQoa2V5KSxcImhhc2hcIjogJChldGFnKSxcInNpemVcIjogJChmc2l6ZSksXCJ3XCI6ICQoaW1hZ2VJbmZvLndpZHRoKSxcImhcIjogJChpbWFnZUluZm8uaGVpZ2h0KSxcImV4dFwiOiQoZXh0KSxcImZuYW1lXCI6JChmbmFtZSl9IiwibWltZUxpbWl0IjoiaW1hZ2VcLyoiLCJmc2l6ZUxpbWl0Ijo4Mzg4NjA4LCJkZWxldGVBZnRlckRheXMiOjEsInNjb3BlIjoiY2xvdWQxLWdhaXR1YmFvLW5ldCIsImRlYWRsaW5lIjoxNTI3NDU0ODAzfQ=='}}
            >
                {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
            </Upload>
        </div>
    )
}
export default UploadImg;