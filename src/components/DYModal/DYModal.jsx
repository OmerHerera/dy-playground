import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { extraContextData } from './../../utils/dy-utils';


export const ModalTypes = {
  login: 'login',
  optIn: 'optIn',
  optOut: 'optOut',
  manager: 'manager'
};
export const DYModal = ({ type, show, handleClose, handlers, setRecommendationContextApp }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginType, setLoginType] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [env, setEnv] = useState('');
  const [data, setData] = useState('');
  const [language, setLanguage] = useState('');
  const [context, setContext] = useState('');
  let modalTitle = '';
  switch (type) {
    case ModalTypes.login:
      modalTitle = '🔐 Login';
      break;
    case ModalTypes.optIn:
      modalTitle = '📍 Opt In/Out';
      break;
    case ModalTypes.manager:
      modalTitle = '🕹️ Controller';
      break;
    default:
      modalTitle = '';
      break;
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          type === ModalTypes.login ?
            <>
              <Form.Select
                onChange={e => {
                  setLoginType(e.target.value);
                }}
              >
                <option value="email">Email</option>
                <option value="he">Hashed Email</option>
                <option value="id">ID</option>
              </Form.Select>
              <br />
            </> : null
        }
        {
          type === ModalTypes.login || type === ModalTypes.optIn ?
            <>
              <Form.Group className="mb-3" controlId="formCuId">
                <Form.Control type="email" placeholder={type === ModalTypes.login ? 'CUID': 'Email'} onChange={(e) => {
                  setLoginEmail(e?.target?.value);
                }} />
              </Form.Group>
            </> :
            null
        }
        {
          type === ModalTypes.manager ?
            <>
              <Form.Group className="mb-3" controlId="formSectionId">
              <Form.Label>Section Id</Form.Label>
                <Form.Control type="text" placeholder="Section Id" onChange={(e) => {
                  setSectionId(e?.target?.value);
                }} />
                <br />
              <Button variant="primary" onClick={async () => {
                const res = await handlers?.manager('sectionId', sectionId, true);
                 return res ? toast.success(`SectionId Changed ${sectionId}`) : toast.error('SectionId change failed!')
              }}>Change SectionId</Button>
              </Form.Group>

              
              <Form.Group className="mb-3" controlId="formEnv">
              <Form.Label>Environment</Form.Label>
                <Form.Control type="text" placeholder="Environment" onChange={(e) => {
                  setEnv(e?.target?.value);
                }} />
                <br />
              <Button variant="primary" onClick={async () => {
                const res = await handlers?.manager('env', env, true);
                 return res ? toast.success(`Environment Changed ${sectionId}`) : toast.error('Environment change failed!')
              }}>Change Environment</Button>
              </Form.Group>
              
              <Form.Group className="mb-3" controlId="formContext">
                <Form.Label>Context</Form.Label>
                <Form.Select onChange={e => {
                  setContext(e.target.value);
                }}>
                  <option id="HOMEPAGE" value="HOMEPAGE">HOMEPAGE</option>
                  <option id="PRODUCT" value="PRODUCT">PRODUCT</option>
                  <option id="CATEGORY" value="CATEGORY">CATEGORY</option>
                  <option id="CART" value="CART">CART</option>
                  <option id="OTHER" value="OTHER">OTHER</option>
                </Form.Select>
                <br />
                <Button variant="primary" onClick={async () => {
                  const res = await handlers?.manager('context', context);
                  const result = await setRecommendationContextApp({ type: context });
                 return res && result ? toast.success(`Context Changed ${context}`) : toast.error('Context change failed!')
              }} >Change Context</Button>
                <br />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formData">
                <Form.Label>Data</Form.Label>
                <Form.Control type="text" placeholder="SKU, SKU" onChange={(e) => {
                  setData(e?.target?.value);
                }}/>
                <br />
                <Button variant="primary" onClick={async () => {
                  const res = await handlers?.manager('data', data);
                  const result = await setRecommendationContextApp({ extra: extraContextData.data, data });
                 return res && result? toast.success(`Data Changed ${data}`) : toast.error('Data change failed!')
              }} >Change Data</Button>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formLang">
                <Form.Label>Language</Form.Label>
                <Form.Control type="text" placeholder="en_GB" onChange={(e) => {
                  setLanguage(e?.target?.value);
                }}/>
                <br />
                <Button variant="primary" onClick={async () => {
                  const res = await handlers?.manager('lang', language);
                  const result = await setRecommendationContextApp({ extra: extraContextData.lng, data: language });
                 return res && result ? toast.success(`Language Changed ${language}`) : toast.error('Language change failed!')
              }} >Change Language</Button>
              </Form.Group>

              
            </>
            : null
        }
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} >
          Close
        </Button>
        {
          type === ModalTypes.login ?
            <>
              <Button variant="primary" onClick={async () => {
                const res = await handlers?.login(loginEmail, loginType);
                 return res ? toast.success(`Login by ${loginType} : ${loginEmail}`) : toast.error('Login failed!')
              }} >
                Login
              </Button>
            </> : null
        }
        {
          type === ModalTypes.optIn ?
            <>
              <Button variant="primary" onClick={async () => {
                const res = await handlers?.optIn(loginEmail);
                return res ? toast.success(`Opt In:  ${loginEmail}`) : toast.error('Opt In failed!')
              }} >Opt In</Button>
              
              <Button variant="primary" onClick={async () => {
                const res = await handlers?.optOut(loginEmail);
                return res ? toast.success(`Opt Out:  ${loginEmail}`) : toast.error('Opt Out failed!')
              }} >Opt Out</Button>
          </> : null
        }
      </Modal.Footer>
    </Modal>
  );
}
