import { Row, Col } from 'antd';
import styles from './index.css'
const Info = ({ ainfo }) => {
    let aarr = []
    for (let item in ainfo) {
        if (ainfo[item] === true) {
            ainfo[item] = 'nv'
        } else if (ainfo[item] === false) {
            ainfo[item] = '男'
        }
        aarr.push({'key': item+':'})
        ainfo[item] && aarr.push({'key': ainfo[item]})
    }
    const menu = aarr.map(item => <Col className={styles.cols} span={6} key={item.key}>{item.key}</Col>)
    return (
        <Row> 
            <Col className={styles.firstcol} span={24}>人员信息1</Col>
            {menu}
        </Row>
    )

}
export default Info;