import { Row, Col } from 'antd';
import styles from './index.css'
const Info = ({ cinfo }) => {
    let aarr = []
    for (let item in cinfo) {
        if (cinfo[item] === true) {
            cinfo[item] = 'nv'
        } else if (cinfo[item] === false) {
            cinfo[item] = '男'
        }
        aarr.push({'key': item+':'})
        cinfo[item] && aarr.push({'key': cinfo[item]})
    }
    const menu = aarr.map(item => <Col className={styles.cols} span={6} key={item.key}>{item.key}</Col>)
    return (
        <Row> 
            <Col className={styles.firstcol} span={24}>人员信息3</Col>
            {menu}
        </Row>
    )

}
export default Info;