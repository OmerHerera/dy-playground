import { Accordion } from "react-bootstrap";
const DYInfo = ({ sectionId, scripVer, dyId, context, data, language, env }) => {
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>🇮 🇳 🇫 🇴 - 🇩 🇾 🇳 🇦 🇲 🇮 🇨</Accordion.Header>
        <Accordion.Body>
        {
            sectionId ?
              <span>
                #️⃣ SectionId: {sectionId}
              </span> : null
          }
          {
            env ?
              <>
                <br />
                <span>
                  ♻️ Env: {env}
                </span>
              </>
              : null
          }
          {
            scripVer ?
              <>
                <br />
                <span>
                ✏️ Script: {scripVer}
                </span>
              </>
              : null
          }
          {
            dyId ?
              <>
                <br />
                <span>
                👤 dyId: {dyId}
                </span>
              </>
              : null
          }
          {
            context ?
              <>
                <br />
                <span>
                  ⚓ Context: {context}
                </span>
              </>
              : null
          }
          {
            language ?
              <>
                <br />
                <span>
                  🌍 Lang: {language}
                </span>
              </>
              : null
          }
          {
            data ?
              <>
                <br />
                <span>
                  💾 Data: {data}
                </span>
              </>
              : null
          }
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  )
}

export default DYInfo
