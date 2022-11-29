import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  notification,
  Row,
  Modal,
  Radio,
  Space
} from "antd";
import type { RadioChangeEvent } from 'antd';
import { Link, useNavigate } from "react-router-dom";
import { MyRoutes } from "../route/MyRoutes";
import { SERVER_BASE_URL } from "../constants";
import {web3Accounts, web3Enable, web3FromAddress} from "@polkadot/extension-dapp";
import { stringToU8a, u8aToHex, u8aWrapBytes  } from '@polkadot/util';
import axios from "axios"


const Login = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState<any>();
  const [isWallet, setIsWallet] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState<any>([]);
  const [walletAddress, setWalletAddress] = useState<string>()
  useEffect(() => {
      extensionSetup()
  }, []);

  const extensionSetup = async () => {
      const extensions = await web3Enable('Wallet-connect-tutorial');
      if (extensions.length === 0) {
          notification.error({
            message: "Wallet",
            description: "No extension installed.",
            placement: "top",
          });
          setIsWallet(false);
          return;
      }
      let accounts = await web3Accounts();

      setAccounts(accounts);
      const availableAccountsBuf: any = []
      accounts.map((account: any) => {
        return availableAccountsBuf.push({
          key: account.meta.name,
          text: account.meta.name,
          value: account.address,
        })
      })
      setAvailableAccounts(availableAccountsBuf)
  };
  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setWalletAddress(e.target.value);
  };
  const onSignIn = async () => {  
    if(walletAddress) {
      const injector = await web3FromAddress(walletAddress);
      console.log(injector.signer)
      const message = `Sign-in request for address ${walletAddress}.`;
      const wrappedMessage = u8aWrapBytes(message);
      const signature = await injector.signer.signRaw({
        address: walletAddress,
        data: u8aToHex(wrappedMessage),
        type: 'bytes'
      });
      console.log(signature.signature)
      const requestPayload = {
        address: walletAddress,
        message,
        signature: signature.signature
      }
      await axios.post(`${SERVER_BASE_URL}/signin`, requestPayload).then( async (res) => {
        console.log(res)
        if (res.status === 201) {
          localStorage.setItem("panda-token", res.data.access_token);
          navigate(MyRoutes.secret);
          notification.success({
            message: "Success",
            description: "Welcome to our website.",
            placement: "topRight",
          });
        } else {
          notification.warning({
            message: "Fail",
            description: res.data.errorMessage,
            placement: "topRight",
          });
        }
      })
    } else {
      notification.warning({
        message: "Warning",
        description: "Please select a wallet.",
        placement: "top",
      });
    }
    
  }

  return (
    <Row className="login-page" align="middle" justify="center">
      <Col md={8} sm={16} xs={24}>
        <h1 className="login-title">Welcome to Login!</h1>
            <Modal
              title="Select Wallet Account"
              centered
              open={modalOpen}
              onOk={() => onSignIn()}
              onCancel={() => setModalOpen(false)}
            >
              <div style={{backgroundColor: 'lightgray', borderRadius: '5px', padding: '4px 8px'}}>
              <Radio.Group onChange={onChange} value={walletAddress}>
                <Space direction="vertical">
                  {
                    availableAccounts.map((account: any) => {
                      return (
                        <Radio value={account.value} key={account.value}>
                          <Row>
                            <Col className="gutter-row" span={4}>{account.text}</Col>
                            <Col className="gutter-row" span={30}>{account.value}</Col>
                          </Row>
                        </Radio>                      
                      )
                    })
                  }
                  
                </Space>
              </Radio.Group>
                
              </div>
            </Modal>
            <Button type="primary" disabled = {!isWallet} onClick={() => setModalOpen(true)} block>
              Login
            </Button>
      </Col>
    </Row>
  );
};

export default Login;
