import classNames from "classnames";
import { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Editor from "../../../../Components/Editor/Editor";
import { PostContext } from "../../../../Context/post.context";
import GeneralLayout from "../../../../Layouts/GeneralLayout/GeneralLayout";
import PanelLayout from "../../../../Layouts/PanelLayout/PanelLayout";
import SectionLayout from "../../../../Layouts/SectionLayout/SectionLayout";

const NewPost = () => {
  const [post, setPost] = useState({
    title: "My new post ",
  });
  const PostValue = useMemo(() => ({ post, setPost }), []);

  const [titleFocus, setTitleFocus] = useState(false);

  const onTitleFocus = () => setTitleFocus(true);
  const onTitleBlur = () => setTitleFocus(false);

  const titleClassNameBlur = classNames(
    "fw-bold w-100 border-0 bg-transparent shadow-none"
  );
  const titleClassNameFocus = classNames("fw-bold w-100 border-1 shadow-sm");

  return (
    <GeneralLayout title="New Post">
      <PostContext.Provider value={PostValue}>
        <PanelLayout>
          <Row>
            <Col sm={12} xl={8}>
              <SectionLayout className="py-0" title="Content">
                <Editor placeholder="Content..." />
              </SectionLayout>
              <SectionLayout className="d-none d-xl-flex" title="Post Score">
                Some post score here!
              </SectionLayout>
            </Col>
            <Col sm={12} xl={4}>
              <Row className="mx-0">
                <Col className="px-0" sm={12} md={6} xl={12}>
                  <SectionLayout title="Status">hie</SectionLayout>
                </Col>
                <Col className="px-0" sm={12} md={6} xl={12}>
                  <SectionLayout title="Versions">hie</SectionLayout>
                </Col>
                <Col className="px-0" sm={12} md={6} xl={12}>
                  <SectionLayout title="Categories">hie</SectionLayout>
                </Col>
                <Col className="px-0" sm={12} md={6} xl={12}>
                  <SectionLayout title="Tags">hie</SectionLayout>
                </Col>
                <Col className="px-0" sm={12} md={6} xl={12}>
                  <SectionLayout title="Banner">hie</SectionLayout>
                </Col>
                <Col className="px-0" sm={12}>
                  <SectionLayout
                    className="d-flex d-xl-none"
                    title="Post Score"
                  >
                    Some post score here!
                  </SectionLayout>
                </Col>
              </Row>
            </Col>
          </Row>
        </PanelLayout>
      </PostContext.Provider>
    </GeneralLayout>
  );
};

export default NewPost;
