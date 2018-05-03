import { Row, Col } from 'antd';
import styles from './index.css'
const Info = ({ binfo }) => {
    let aarr = []
    for (let item in binfo) {
        if (binfo[item] === true) {
            binfo[item] = 'nv'
        } else if (binfo[item] === false) {
            binfo[item] = '男'
        }
        aarr.push({'key': item+':'})
        binfo[item] && aarr.push({'key': binfo[item]})
    }
    const menu = aarr.map(item => <Col className={styles.cols} span={6} key={item.key}>{item.key}</Col>)
    return (
        <Row> 
            <Col className={styles.firstcol} span={24}>人员信息2</Col>
            {menu}
        </Row>
    )

}
export default Info;