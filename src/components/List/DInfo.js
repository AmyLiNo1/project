import { Row, Col } from 'antd';
import styles from './index.css'
const Info = ({ dinfo }) => {
    let aarr = []
    for (let item in dinfo) {
        if (dinfo[item] === true) {
            dinfo[item] = 'nv'
        } else if (dinfo[item] === false) {
            dinfo[item] = '男'
        }
        aarr.push({'key': item+':'})
        dinfo[item] && aarr.push({'key': dinfo[item]})
    }
    const menu = aarr.map(item => <Col className={styles.cols} span={6} key={item.key}>{item.key}</Col>)
    return (
        <Row> 
            <Col className={styles.firstcol} span={24}>人员信息4</Col>
            {menu}
        </Row>
    )

}
export default Info;