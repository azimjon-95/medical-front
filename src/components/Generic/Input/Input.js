import React, { useState } from 'react';
import './Input.css'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
const App3 = () => {
  const [formData, setFormData] = useState({
    text: ""
  })

  const TeleChat = (e) => {
    e.preventDefault()

    let msg1 = `<b> %0A ${formData.username}</b>`
    let msg2 = `<b> %0A${formData.name}</b>`
    let msg3 = `<b> %0A${formData.number}</b>`
    let msg4 = `<b> %0A${formData.text}</b>`


    let token = "6778901626:AAFqgQp0f_LjxwBd1bkjuyJqFBafRV9kpOw"
    let id = 5283463098;
    let tokenBot = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${id}&text=${msg1}${msg2}${msg3}${msg4}&parse_mode=html`

    let api = new XMLHttpRequest()
    api.open("GET", tokenBot, true)
    api.send();
  }

  const onFinish = () => {
  };
  return (
    <div className="login-form">
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Обязательное поле!',
            },
          ]}
        >
          <Input
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            value={formData.username}
            className="login-form-input"
            placeholder="Исмингиз" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: 'Обязательное поле!',
            },
          ]}
        >
          <Input
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            value={formData.name}
            className="login-form-input"
            placeholder="Тельфон Рақамингиз" />
        </Form.Item>
        <Form.Item
          name="number"
          rules={[
            {
              required: true,
              message: 'Обязательное поле!',
            },
          ]}
        >
          <Input
            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
            value={formData.number}
            className="login-form-input"
            placeholder="Клиника марказингиз номи" />
        </Form.Item>
        <Form.Item
          name="text"
          rules={[
            {
              required: true,
              message: 'Обязательное поле!',
            },
          ]}
        >
          <Input
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            value={formData.text}
            className="login-form-input"
            type="text"
            placeholder="Телеграм манзилингиз"
          />
        </Form.Item>
        <Form.Item>
        </Form.Item>

        <Form.Item>
          <Button onClick={(e) => TeleChat(e)} type="primary" htmlType="submit" className="login-form-button">ДEМО ОЛИШ</Button>
          <p className='login-form-p'>Сизнинг барча маълумотларингиз хавфсизлиги қонун доирсида ҳимоя қилинади</p>
          <p></p>
        </Form.Item>
      </Form>
    </div>
  );
};
export default App3;



