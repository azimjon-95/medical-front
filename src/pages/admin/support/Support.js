import React from 'react';
import './style.css';
import { Flex, Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Support = () => {

    const [formData, setFormDate] = useState({
        fullname: '',
        question: ''
    })

    const sendMsgToBot = async (e) => {
        e.preventDefault()

        let msg = `<b> Klent savol qoldirdi!</b>%0A%0A 👤 <b>Ismi</b>: ${formData.fullname}%0A%0A  ✉️ <b>Savol:</b> ${formData.question}%0A`

        let tokenBot = "6662523456:AAHLAjqjIyslOzbUfj-pcXSYPnV1cR1EOPI"

        const chatID = 39464759

        let tempUrl = `https://api.telegram.org/bot${tokenBot}/sendMessage?chat_id=${chatID}&text=${msg}&parse_mode=html`
        let api = new XMLHttpRequest();
        api.open("GET", tempUrl, true);
        api.send()

        setFormDate({
            fullname: '',
            question: ''
        })
    }

    const { TextArea } = Input;
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };
    return (
        <div className='support'>
            <div className="supportBox">


                <Flex vertical gap={32}>
                    <Input onChange={(e) => setFormDate({ ...formData, fullname: e.target.value })} value={formData.fullname} size="large" placeholder="large size" prefix={<UserOutlined />} />
                    <Input showCount maxLength={20} onChange={onChange} />
                    <TextArea showCount maxLength={100} onChange={onChange} placeholder="can resize" />
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={(e) => setFormDate({ ...formData, question: e.target.value })} value={formData.question}
                        placeholder="disable resize"
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                    />

                    <Button onClick={sendMsgToBot} type="primary" block>
                        Primary
                    </Button>
                </Flex>

            </div>
            <div className="supportBox">

            </div>
        </div>
    )
}

export default Support
