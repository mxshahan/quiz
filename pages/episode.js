import React, { lazy, Suspense, useState, useEffect, useRef } from "react";
import _ from "lodash";
import Link from "next/link";
import {
  Grid,
  Button,
  Popup,
  Modal,
  Header,
  List,
  Label,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
  Tab,
  Comment,
  Form,
  Progress,
} from "semantic-ui-react";
import ReactTimeAgo from "react-time-ago";
import EpisodeList from "../components/Episodes/EpisodeList";
import { Image as CloudinaryImage, Transformation } from "cloudinary-react";

import data from "../components/Episodes/data.json";

const buildPanes = ({
  match,
  setQuiz,
  updateMessageRead,
  showQuiz,
  quizBestScores,
  handleChange,
  sendUserMessage,
  message,
  loadEpisode,
  ctxt,
  userProfile,
  locale,
  intl,
  course,
  episode,
}) => {
  const module = _.find(course.modules, (mod) => mod.id === episode.module_id);
  const numEpisodesinCourse = course.modules.map((mod) => mod.episodes.length);
  const userMessagesClone =
    userProfile?.UserMessages && Array.from(userProfile?.UserMessages);
  const userMessagesToShow = showQuiz
    ? userMessagesClone &&
      userMessagesClone.filter((msg) =>
        episode.quiz ? msg.quiz_id === episode.quiz.id : null
      )
    : userMessagesClone &&
      userMessagesClone.filter(
        (msg) => msg.quiz_id === null && msg.episode_id === episode.id
      );
  const responses =
    userMessagesToShow &&
    userMessagesToShow.filter(
      (msg) =>
        msg.direction === "from" &&
        msg.message_read &&
        msg.message_read !== true
    );
  const currentBestScore =
    episode.quiz &&
    _.find(
      quizBestScores,
      (bestScore) => bestScore.quiz_id === episode.quiz_id
    );
  const tab1Content = (
    <div>
      <List>
        <List.Header as="h2" style={{ color: "beige", textAlign: "left" }}>
          <Icon name="settings" style={{ color: "beige", fontSize: ".75em" }} />
          <span style={{ fontSize: ".8em", marginLeft: ".5em" }}>
            Resources
          </span>
        </List.Header>
        {currentBestScore?.best_score > 0 && showQuiz === true ? (
          <div className={"best-score"}>
            <Header
              as={"h3"}
              style={{
                fontSize: "1.2em",
                color: "beige",
                textAlign: "left",
              }}
            >
              Your best score:
            </Header>
            <Progress
              style={
                currentBestScore.best_score > 50
                  ? { backgroundColor: "greenyellow" }
                  : {}
              }
              percent={currentBestScore.best_score}
              progress
            />
          </div>
        ) : null}
        {episode.resources ? (
          episode.resources
            .filter((res) => res.lang === locale)
            .map((resource) => {
              // ( resource images are saved to s3 )
              // use : https://cloudinary.com/documentation/fetch_remote_images

              return (
                <List.Item>
                  <List.Description
                    style={{ color: "beige", textAlign: "left" }}
                  >
                    <List>
                      <List.Item
                        style={{ textAlign: "left" }}
                      >{`${resource.name}:`}</List.Item>
                      <List.Item
                        as="a"
                        target="_blank"
                        rel="noopener noreferrer"
                        href={resource.link}
                        style={{ textAlign: "left" }}
                        className={"truncate-list"}
                      >
                        {resource.link}
                      </List.Item>
                    </List>
                  </List.Description>
                </List.Item>
              );
            })
        ) : (
          <List.Item>
            <Header as="h4" style={{ color: "beige", textAlign: "left" }}>
              No resources
            </Header>
          </List.Item>
        )}
        <List.Header as="h2" style={{ color: "beige", textAlign: "left" }}>
          <Icon name="chat" style={{ color: "beige", fontSize: ".75em" }} />
          <span style={{ fontSize: ".8em", marginLeft: ".5em" }}>
            Questions?
          </span>
        </List.Header>
        <List.Item style={{ textAlign: "left" }}>
          <Comment.Group>
            {userMessagesToShow &&
              userMessagesToShow
                .sort((a, b) => {
                  return a.timestamp < b.timestamp
                    ? -1
                    : a.timestamp > b.timestamp
                    ? 1
                    : 0;
                })
                .map((message) => {
                  const userIsAuthor =
                    userProfile.email === message.root_email &&
                    message.direction === "to";
                  console.log(message.root_email);
                  if (
                    message.direction === "from" &&
                    message.message_read !== true
                  ) {
                    updateMessageRead({
                      id: message.id,
                      root_email: message.root_email,
                      message_read: true,
                    });
                  }
                  return (
                    <Comment>
                      <Comment.Avatar
                        as="a"
                        src={
                          userIsAuthor
                            ? userProfile.picture
                            : course.Author.picture
                        }
                      />
                      <Comment.Content>
                        <Comment.Author
                          as="a"
                          style={{
                            color: "beige",
                          }}
                        >
                          {userProfile.name}
                        </Comment.Author>
                        <Comment.Metadata
                          style={{
                            color: "beige",
                          }}
                        >
                          <div>
                            <ReactTimeAgo locale={locale}>
                              {new Date(message.timestamp)}
                            </ReactTimeAgo>
                          </div>
                        </Comment.Metadata>
                        <Comment.Text
                          style={{
                            color: "beige",
                          }}
                        >
                          {message.message}
                        </Comment.Text>
                        <Comment.Actions>
                          <Comment.Action active>Reply</Comment.Action>
                        </Comment.Actions>
                      </Comment.Content>
                    </Comment>
                  );
                })}
            <Form onSubmit={sendUserMessage} reply>
              <Form.TextArea
                onChange={handleChange}
                name="message"
                value={message}
                style={{ backgroundColor: "darkslategray", color: "white" }}
              />
              <Button
                content={intl?.formatMessage({ id: "courses_add_reply" })}
                labelPosition="left"
                icon="edit"
                primary
              />
            </Form>
          </Comment.Group>
        </List.Item>
      </List>
    </div>
  );

  const tab2Content = (
    <div style={{ textAlign: "left" }}>
      <Header as="h2" icon style={{ color: "beige", margin: "unset" }}>
        <Icon
          name="terminal"
          style={{ color: "beige", fontSize: ".75em", margin: "unset" }}
        />
      </Header>
      <EpisodeList
        {...{
          match,
          setQuiz,
          loadEpisode,
          quizBestScores,
          userMessagesClone,
          showQuiz,
          ctxt,
          course,
          episode,
        }}
        styles={{ moduleColor: "beige", episodeColor: "beige" }}
      />
    </div>
  );
  return [
    {
      menuItem: (
        <Menu.Item
          key="allEpisodesPanel"
          style={{
            fontSize: "1.1em",
            padding: "1em .8em" /*, margin: "0 1em", borderColor: "beige"*/,
          }}
        >
          <Popup
            trigger={
              <div>
                All episodes
                {/*<Label style={{marginLeft: '5px'}}>{`${numEpisodesinCourse.reduce((a, b) => a + b, 0)}`}</Label>*/}
              </div>
            }
            content={`${numEpisodesinCourse.reduce(
              (a, b) => a + b,
              0
            )} episodes`}
            position={"right center"}
            inverted
          />
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false} style={{ backgroundColor: "black" }}>
          {tab2Content}
        </Tab.Pane>
      ),
    },
    {
      menuItem: (
        <Menu.Item
          key="currentLessonPanel"
          style={{
            fontSize: "1.1em",
            padding: "1em .8em" /*, margin: "0 1em", borderColor: "beige"*/,
          }}
        >
          <Popup
            trigger={
              <div>
                Current lesson
                {responses?.length > 0 && (
                  <Label
                    style={{ marginLeft: "5px" }}
                  >{`${responses?.length}`}</Label>
                )}
              </div>
            }
            content={`${responses?.length} ${
              responses?.length === 1 ? "message" : "messages"
            }`}
            position={"right center"}
            inverted
          />
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false} style={{ backgroundColor: "black" }}>
          {tab1Content}
        </Tab.Pane>
      ),
    },
  ];
};

const wideSetup = ({
  match,
  allEpisodesArr,
  setQuiz,
  updateMessageRead,
  showQuiz,
  quizBestScores,
  userProfile,
  handleChange,
  sendUserMessage,
  message,
  loadEpisode,
  ctxt,
  nextEpisode,
  toggleCollapsedMode,
  handleTabChange,
  activeIndex,
  locale,
  intl,
  course,
  episode,
}) => {
  const completed =
    userProfile?.completed_episodes &&
    userProfile?.completed_episodes.find((ep) => ep.id === episode.id);
  const firstModule = course.modules[0];
  const lastModule = course.modules[course.modules.length - 1];
  const courseFirstEpisodeId = firstModule.episodes[0].id;
  const courseLastEpisodeId =
    lastModule.episodes[lastModule.episodes.length - 1].id;
  const isCourseFirstEpisode = courseFirstEpisodeId === episode.id;
  const isCourseLastEpisode = courseLastEpisodeId === episode.id;
  // const allEpisodesArr = course.modules.map(module => module.episodes).flat();
  const numEpisodesinCourse = allEpisodesArr.length;
  const currEpisodeIdx = allEpisodesArr.findIndex((el) => el.id === episode.id);
  const nextEp = allEpisodesArr[currEpisodeIdx + 1];
  const prevEp = allEpisodesArr[currEpisodeIdx - 1];
  const nextEpisodeName = nextEp ? nextEp[`title`] : "";
  const prevEpisodeName = prevEp ? prevEp[`title`] : "";

  const pctComplete = userProfile?.completed_episodes
    ? userProfile?.completed_episodes.length /
      numEpisodesinCourse.reduce((a, b) => a + b, 0)
    : 0;
  return (
    <div>
      <div className="course-viewer--sidebar-buttons">
        <Menu.Item as="a" className={"sidebar-menu-buttons"}>
          <Popup
            trigger={
              <Link
                href={{
                  pathname: "/course",
                  query: {
                    /* cid: course?.stub */
                  },
                }}
              >
                <svg viewBox="0 0 24 24">
                  <g>
                    <polygon points="20.707,4.707 19.293,3.293 12,10.586 4.707,3.293 3.293,4.707 10.586,12 3.293,19.293  4.707,20.707 12,13.414 19.293,20.707 20.707,19.293 13.414,12 "></polygon>
                  </g>
                </svg>
              </Link>
            }
            content="Exit the course"
            position={"right center"}
            inverted
          />
        </Menu.Item>
        <Menu.Item
          as="a"
          className={"sidebar-menu-buttons"}
          onClick={() => toggleCollapsedMode()}
        >
          <Popup
            trigger={
              <svg viewBox="0 0 24 24">
                <g>
                  <polygon points="18,20.415 9.586,12 18,3.586 19.414,5.001 12.414,12 19.414,19"></polygon>
                  <polygon points="13,20.415 4.586,12 13,3.586 14.414,5.001 7.414,12 14.414,19"></polygon>
                </g>
              </svg>
            }
            content="Collapse the navigation pane"
            position={"right center"}
            inverted
          />
        </Menu.Item>
      </div>
      <Menu.Item as="a" style={{ padding: "2.5rem 0" }}>
        <div>
          <CloudinaryImage
            cloudName="cloud-itinerary-ltd"
            publicId={course?.course_image}
          >
            <Transformation height="120" width="120" crop="fill" />
          </CloudinaryImage>
          {/*<LazyLoadImage*/}
          {/*    placeholder={<BeatLoader />}*/}
          {/*    src={"https://res.cloudinary.com/cloud-itinerary-ltd/image/upload/w_120,h_120,c_fill,g_auto" + course.course_image.split('image/upload')[1]} />*/}
        </div>
        <div>
          {/*<FormattedMessage id={"elements_now_viewing"}/>*/} {"now viewing"}
        </div>
        <div style={{ fontSize: "1.4em", padding: "1em 0" }}>
          {episode[`title`]}
        </div>
      </Menu.Item>
      <Menu.Item
        className="course-viewer--complete-button"
        style={{ width: "66%", margin: "auto" }}
      >
        <Menu fixed="top" inverted>
          <Menu.Item
            as={"a"}
            className={isCourseFirstEpisode ? "disabled" : "normal"}
            disabled={isCourseFirstEpisode}
            onClick={() => nextEpisode(episode.id, "prev")}
          >
            <Popup
              trigger={
                <svg viewBox="0 0 24 24">
                  <g>
                    <rect x="8" y="8" width="2" height="8"></rect>
                    <polygon points="17,16 17,8 11,12"></polygon>
                  </g>
                </svg>
              }
              content={
                isCourseFirstEpisode
                  ? "This is the 1st episode of the course"
                  : `Prev: ${prevEpisodeName}`
              }
              position={"top center"}
              inverted
            />
          </Menu.Item>
          <Menu.Item className={completed ? "completed" : "normal"}>
            <Popup
              trigger={
                <svg viewBox="0 0 24 24">
                  <g>
                    <path d="M12.042,2c-5.523,0-10,4.477-10,10s4.477,10,10,10s10-4.477,10-10S17.564,2,12.042,2z M11.292,17.75 l-5-3.75l1.5-2l3,2.25l5.25-7l2,1.5L11.292,17.75z"></path>
                  </g>
                </svg>
              }
              content={`You have completed ${Math.round(
                pctComplete * 100
              )}% of the course`}
              position={"top right"}
              inverted
            />
          </Menu.Item>
          <Menu.Item
            as={"a"}
            className={isCourseLastEpisode ? "disabled" : "normal"}
            disabled={isCourseLastEpisode}
            onClick={() => nextEpisode(episode.id, "next")}
          >
            <Popup
              trigger={
                <svg viewBox="0 0 24 24">
                  <g>
                    <rect x="14" y="8" width="2" height="8"></rect>
                    <polygon points="7,16 13,12 7,8"></polygon>
                  </g>
                </svg>
              }
              content={
                isCourseLastEpisode
                  ? "This is the last episode of the course"
                  : `Next: ${nextEpisodeName}`
              }
              position={"right center"}
              inverted
            />
          </Menu.Item>
        </Menu>
      </Menu.Item>
      <Menu.Item as="a">
        <Tab /*activeIndex={activeIndex} onTabChange={() => handleTabChange()}*/
          defaultActiveIndex={1}
          onTabChange={handleTabChange}
          activeIndex={activeIndex}
          menu={{ secondary: true, pointing: true }}
          panes={buildPanes({
            match,
            setQuiz,
            updateMessageRead,
            showQuiz,
            quizBestScores,
            handleChange,
            sendUserMessage,
            message,
            loadEpisode,
            ctxt,
            userProfile,
            locale,
            intl,
            course,
            episode,
          })}
        />
      </Menu.Item>
    </div>
  );
};

const thinSetup = ({
  showQuiz,
  allEpisodesArr,
  userProfile,
  loadEpisode,
  nextEpisode,
  toggleCollapsedMode,
  locale,
  course,
  episode,
}) => {
  const completed =
    userProfile?.completed_episodes &&
    userProfile?.completed_episodes.find((ep) => ep.episode_id === episode.id);
  const firstModule = course.modules[0];
  const lastModule = course.modules[course.modules.length - 1];
  const courseFirstEpisodeId = firstModule.episodes[0].id;
  const courseLastEpisodeId =
    lastModule.episodes[lastModule.episodes.length - 1].id;
  const isCourseFirstEpisode = courseFirstEpisodeId === episode.id;
  const isCourseLastEpisode = courseLastEpisodeId === episode.id;
  const numEpisodesinCourse = allEpisodesArr.length;
  const currEpisodeIdx = allEpisodesArr.findIndex((el) => el.id === episode.id);
  const nextEp = allEpisodesArr[currEpisodeIdx + 1];
  const prevEp = allEpisodesArr[currEpisodeIdx - 1];
  const nextEpisodeName = nextEp ? nextEp[`title`] : "";
  const prevEpisodeName = prevEp ? prevEp[`title`] : "";
  const pctComplete = userProfile?.completed_episodes
    ? userProfile?.completed_episodes.length /
      numEpisodesinCourse.reduce((a, b) => a + b, 0)
    : 0;

  return (
    <div style={{ fontDamily: '"GT Walsheim",sans-serif', fontWeight: "500" }}>
      <div
        className="course-viewer--sidebar-buttons"
        style={{ padding: "0", fontSize: "large", width: "100%" }}
      >
        <Menu.Item
          as="a"
          className={"sidebar-menu-buttons"}
          style={{ textAlign: "center", width: "100%", padding: "0.9em" }}
        >
          <Popup
            trigger={
              <Link
                href={{
                  pathname: "/course",
                  query: {
                    /* cid: course?.stub */
                  },
                }}
              >
                <svg viewBox="0 0 24 24">
                  <g>
                    <polygon points="20.707,4.707 19.293,3.293 12,10.586 4.707,3.293 3.293,4.707 10.586,12 3.293,19.293  4.707,20.707 12,13.414 19.293,20.707 20.707,19.293 13.414,12 "></polygon>
                  </g>
                </svg>
              </Link>
            }
            content="Exit the course"
            position={"right center"}
            inverted
          />
        </Menu.Item>
        <Menu.Item
          as="a"
          className={"sidebar-menu-buttons"}
          style={{ textAlign: "center", width: "100%", padding: "0.9em" }}
          onClick={() => toggleCollapsedMode()}
        >
          <Popup
            trigger={
              <svg viewBox="0 0 24 24">
                <g>
                  <polygon points="6,20.415 4.586,19 11.586,12 4.586,5 6,3.586 14.414,12"></polygon>
                  <polygon points="11,20.415 9.586,19 16.586,12 9.586,5 11,3.586 19.414,12"></polygon>
                </g>
              </svg>
            }
            content="Collapse the navigation pane"
            position={"right center"}
            inverted
          />
        </Menu.Item>
      </div>
      <Menu.Item as="a" style={{ minWidth: "unset", marginTop: "6em" }}>
        <Popup
          trigger={<div>{`${Math.round(pctComplete * 100)}%`}</div>}
          content={`You have completed ${Math.round(
            pctComplete * 100
          )}% of the course`}
          position={"right center"}
          inverted
        />
      </Menu.Item>
      <Menu.Item
        className="course-viewer--complete-button"
        style={{
          margin: "auto",
          position: "absolute",
          top: "16em",
          padding: "unset",
          minWidth: "60px",
        }}
      >
        <Menu
          inverted
          vertical
          className={"course-vertical-controls"}
          style={{ margin: "0" }}
        >
          <Menu.Item
            as={"a"}
            className={isCourseFirstEpisode ? "disabled" : "normal"}
            style={{ padding: ".5em", minWidth: "60px", width: "60px" }}
            disabled={isCourseFirstEpisode}
            onClick={() => {
              nextEpisode(episode.id, "prev");
            }}
          >
            <Popup
              trigger={
                <svg viewBox="0 0 24 24">
                  <g>
                    <rect x="8" y="8" width="2" height="8"></rect>
                    <polygon points="17,16 17,8 11,12"></polygon>
                  </g>
                </svg>
              }
              content={
                isCourseFirstEpisode
                  ? "This is the 1st episode of the course"
                  : `Prev: ${prevEpisodeName}`
              }
              position={"top center"}
              inverted
            />
          </Menu.Item>
          <Menu.Item
            className={completed ? "completed" : "normal"}
            style={{ padding: ".5em", minWidth: "60px", width: "60px" }}
          >
            <Popup
              trigger={
                <svg viewBox="0 0 24 24">
                  <g>
                    <path d="M12.042,2c-5.523,0-10,4.477-10,10s4.477,10,10,10s10-4.477,10-10S17.564,2,12.042,2z M11.292,17.75 l-5-3.75l1.5-2l3,2.25l5.25-7l2,1.5L11.292,17.75z"></path>
                  </g>
                </svg>
              }
              content={`You have completed ${Math.round(
                pctComplete * 100
              )}% of the course`}
              position={"top right"}
              inverted
            />
          </Menu.Item>
          <Menu.Item
            as={"a"}
            className={isCourseLastEpisode ? "disabled" : "normal"}
            style={{ padding: ".5em", minWidth: "60px", width: "60px" }}
            disabled={isCourseLastEpisode}
            onClick={() => nextEpisode(episode.id, "next")}
          >
            <Popup
              trigger={
                <svg viewBox="0 0 24 24">
                  <g>
                    <rect x="14" y="8" width="2" height="8"></rect>
                    <polygon points="7,16 13,12 7,8"></polygon>
                  </g>
                </svg>
              }
              content={
                isCourseLastEpisode
                  ? "This is the last episode of the course"
                  : `Next: ${nextEpisodeName}`
              }
              position={"right center"}
              inverted
            />
          </Menu.Item>
        </Menu>
      </Menu.Item>
      <Menu
        inverted
        vertical
        className={""}
        style={{
          minWidth: "unset",
          marginTop: "6em",
          position: "absolute",
          top: "25em",
          width: "100%",
        }}
      >
        <Menu.Item
          as="a"
          onClick={() => toggleCollapsedMode()}
          className={"thin-resources"}
          style={{
            width: "5em",
            minWidth: "5em",
          }}
        >
          <Popup
            trigger={
              <svg viewBox="0 0 24 24">
                <g>
                  <path d="M11,23c-2.897,0-5-2.313-5-5.5V9c0-3.991,2.794-7,6.5-7S19,5.009,19,9v7h-2V9 c0-2.897-1.893-5-4.5-5S8,6.103,8,9v8.5c0,1.743,0.928,3.5,3,3.5s3-1.757,3-3.5V10c0-0.602-0.146-2-1.5-2S11,9.398,11,10v7H9v-7 c0-2.393,1.407-4,3.5-4S16,7.607,16,10v7.5C16,20.687,13.897,23,11,23z"></path>
                </g>
              </svg>
            }
            content={`Resources for this lesson: ${
              episode.resources
                ? episode.resources.filter((res) => res.lang === locale).length
                : 0
            }`}
            position={"right center"}
            inverted
          />
          <div className={"num-resources"}>
            {episode.resources
              ? episode.resources.filter((res) => res.lang === locale).length
              : 0}
          </div>
        </Menu.Item>
        <Menu.Item
          as="a"
          onClick={() => toggleCollapsedMode()}
          className={"thin-resources"}
          style={{
            width: "5em",
            minWidth: "5em",
          }}
        >
          <Popup
            trigger={
              <svg viewBox="0 0 24 24">
                <g>
                  <path d="M5.998,22v-4h-2c-1.103,0-2-0.897-2-2V4c0-1.104,0.897-2,2-2h16c1.103,0,2,0.896,2,2v12 c0,1.103-0.897,2-2,2h-8.667L5.998,22z M3.998,4v12h4v2l2.667-2h9.333V4H3.998z"></path>
                </g>
              </svg>
            }
            content={`You have ${/*responses?.length ||*/ 0} unread messages`}
            position={"right center"}
            inverted
          />
          <div className={"num-resources"}>{/*responses?.length ||*/ 0}</div>
        </Menu.Item>
      </Menu>
    </div>
  );
};

const Episode = (props) => {
  const { course } = data;

  const mid = "a2d39bb0-f8a0-4587-a33a-cfeb12137f4d";
  const cid = "become-an-algorithms-ninja";
  const eid = "0";

  const [paused, setPaused] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [questionState, setQuestionState] = useState(undefined);
  const [autoplay, setAutoplay] = useState(false);
  const [episodeComplete, setEpisodeComplete] = useState(false);
  const [episodeWaypoint, setEpisodeWaypoint] = useState(0);
  const [sidebarWidth, setSidebarWidth] = useState("wide");
  const [activeIndex, setActiveIndex] = useState(1);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);
  const [exitModalMessage, setExitModalMessage] = useState(undefined);
  const [quizId, setQuizId] = useState(0);
  const [questionOrder, setQuestionOrder] = useState(0);
  const [selectedAnswerIds, setSelectedAnswerIds] = useState(undefined);
  const [answerStatus, setAnswerStatus] = useState("unanswered");
  const [percentAnswered, setPercentAnswered] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState(undefined);
  const [loadingAnswer, setLoadingAnswer] = useState(false);
  const [episode, setEpisode] = useState(undefined);
  const [allEpisodesArr, setAllEpisodesArr] = useState([]);
  const [correctAnswerIds, setCorrectAnswerIds] = useState([]);

  // const [updateStudent, {data: episode_complete_data}] = useMutation(UPDATE_EPISODE_COMPLETE);
  // const [updateStudentQuizAnswer, {data: student_quiz_update_data}] = useMutation(UPDATE_STUDENT_QUIZ_ANSWER);
  // const [updateQuizBestScore, {data: quiz_best_score_data}] = useMutation(UPDATE_QUIZ_BEST_SCORE);

  // const [getCorrectAnswerIds, {data: correct_answer_data, loading: correct_answer_loading}] = useLazyQuery(GET_CORRECT_ANSWER_IDS)

  const correct_answer_data = [0];

  useEffect(() => {
    if (correct_answer_data?.getCorrectAnswerIdsForQuestion) {
      const {
        getCorrectAnswerIdsForQuestion: correct_answers,
      } = correct_answer_data;
      const enabledQuestions = episode.quiz.questions.filter(
        (q) => !q.disabled
      );
      const question = enabledQuestions[questionOrder];

      const { num_expected_answers } = question;

      const user_answer_ids = Object.entries(questionState).map((e) => {
        const [k, v] = e;
        if (k.startsWith(`question_${questionOrder}`)) return v;
      });

      const numQuestions = enabledQuestions.length;
      const correctAnswer =
        num_expected_answers === 1
          ? correct_answers[0] === user_answer_ids[0]
          : arraysMatch(correct_answers, user_answer_ids);
      const { quizQuestions, percentAnswered } = quizAnswerStatus(episode, 1);

      let score = score;

      if (correctAnswer && answerStatus === "unanswered") {
        let nominator = 1;

        // if (quizQuestions) {
        //     let correctAnswers = quizQuestions.map(quizQuestion => {
        //         return enabledQuestions.map(q => {
        //             return ((q.id === quizQuestion.id) && (arraysMatch(correct_answers, quizQuestion.user_answer))) ? true : undefined;
        //         }).filter(obj => obj);
        //     });
        //
        //     correctAnswers = correctAnswers.filter(answer => !_.isEmpty(answer));
        //
        //     nominator = nominator + correctAnswers.length;// questionAnswers.filter(x => answeredUserQuestions.includes(x));
        // }

        score = Math.round((nominator / numQuestions) * 100);
      }

      if (quizQuestions >= numQuestions) {
        if (user?.QuizBestScores) {
          const currentBestScore =
            _.find(
              user?.QuizBestScores,
              (bestScore) => bestScore.quiz_id === episode.quiz.id
            ) || 0;
          // (score > currentBestScore.best_score) && dispatch(updateQuizBestScore({
          //     email: user.email,
          //     course_id: state.course.id,
          //     quiz_id: episode.quiz.id,
          //     best_score: score
          // }));
        }
        closeQuiz({
          module_id: module.id,
          episode_id,
          quiz_id: module.Quiz.id,
        });
      } else {
        if (answerStatus !== "unanswered") {
          // this corresponds to 'next question'
          setQuestionOrder(questionOrder + 1);
          setAnswerStatus("unanswered");
        } else {
          setAnswerStatus(correctAnswer ? "correct" : "incorrect");
          setPercentAnswered(percentAnswered);
          setScore(score);
          setSelectedAnswerIds(user_answer_ids);
          // updateQuizBestScore({
          //     "input": {
          //         "organization_name": tenant?.organization_name,
          //         "tenant_id": tenant?.tenant_id_encrypted,
          //         "sub": user?.sub,
          //         "path_hash": md5(`${episode.id}/${episode.quiz?.id}`),
          //         "best_score": score
          //     }
          // })
          setLoadingAnswer(false);
        }
      }
      setCorrectAnswerIds(correct_answers);
    }
  }, [correct_answer_data]);

  useEffect(() => {
    if (episodeComplete === true) {
      onEpisodeComplete({ episode_id: episode.id }).catch((err) =>
        console.log(`onEpisodeComplete: ${err}`)
      );
    }
  }, [episodeComplete]);

  useEffect(() => {
    // TBD
  }, [episodeWaypoint]);

  useEffect(() => {
    if (/*!module || */ !episode) {
      const current_module = course?.modules.find(
        (module) => module.id === mid
      );
      const { episode: current_episode } = data; //current_module?.episodes.find(episode => episode.item_order === parseInt(eid));
      setAllEpisodesArr(
        course?.modules.map((module) => module.episodes).flat()
      );
      // setModule(current_module);
      setEpisode(current_episode);
      if (current_episode?.episode_type === "quiz") setShowQuiz(true);
    } else {
      if (episode?.quiz) setQuiz({ quiz_id: episode?.quiz.id });
      setActiveIndex(1);
    }
  }, [/*module,*/ episode]);

  const onEpisodeComplete = async ({ episode_id }) => {
    if (episodeComplete === true) {
      // updateStudent({
      //     variables: {
      //         "updatestudentinput": {
      //             "organization_name": tenant?.organization_name,
      //             "tenant_id": tenant?.tenant_id_encrypted,
      //             "sub": user?.sub,
      //             "completed_episode": episode_id
      //         }
      //     }
      // })
    }
  };

  const onEpisodeWaypoint = ({ playedSeconds, episode_id }) => {
    console.log(`playedSeconds: ${playedSeconds}, episode_id: ${episode_id}`);
    // updateStudent({
    //         variables: {
    //             "updatestudentinput": {
    //                 "organization_name": tenant?.organization_name,
    //                 "tenant_id": tenant?.tenant_id_encrypted,
    //                 "sub": user?.sub,
    //                 episode_id,
    //                 "played_seconds": playedSeconds
    //             }
    //         }
    //     }
    // )
  };

  const findModuleById = ({ module_id }) => {
    return course?.modules?.find((mod) => mod.id === module_id);
  };

  const showAlert = ({ message }) => {
    setExitModalMessage(message);
    setShowExitModal(true);
  };

  const quitEpisode = () => {
    console.log("quitEpisode called - not active for this demo");
  };

  const nextEpisode = (episode_id, direction) => {
    const currEpisode = allEpisodesArr.find((ep) => ep.id === episode_id);
    const currEpisodeIdx = allEpisodesArr.findIndex(
      (ep) => ep.id === episode_id
    );
    const isFirstEpisode = currEpisodeIdx === 0;
    const isLastEpisode = currEpisodeIdx + 1 === allEpisodesArr.length;
    const currModule = findModuleById({ module_id: currEpisode.module_id });
    const numEpisodesInCurrentModule = currModule?.episodes.length;
    let episode_order = currEpisode?.item_order;

    if (isFirstEpisode === true && direction === "prev") {
      showAlert({
        message: `you are already at the first episode of this course, do you want to quit this course?`,
      });
      return;
    }

    if (isLastEpisode === true && direction === "next") {
      showAlert({
        message: `you are already at the last episode of this course, do you want to quit this course?`,
      });
      return;
    }

    let nextEpisode;

    if (direction === "next") {
      if (numEpisodesInCurrentModule <= episode_order + 1) {
        // skip to next module
        // if a module has a quiz, open quiz. If quiz is complete, then:
        const { percentAnswered } = quizAnswerStatus(module, 0);
        const nextModule = course?.modules[currModule?.item_order + 1];
        nextEpisode = nextModule?.episodes[0];
        // setModule(nextModule);
      } else {
        nextEpisode = currModule?.episodes[episode_order + 1];
      }
    } else if (direction === "prev") {
      if (currEpisode.item_order === 0) {
        const prevModule = course?.modules[currModule?.item_order - 1];
        nextEpisode = prevModule?.episodes[prevModule?.episodes.length - 1];
      } else {
        nextEpisode = currModule?.episodes[episode_order - 1];
      }
    }
    setEpisode(nextEpisode);
    // setModule(module);
    // setEpisode(module?.episodes[episode_order]);
    // setPaused(true);
    // setAutoplay(false);
  };

  const handleChange = (e, { name, value }) => {
    setQuestionState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleQuestionChange = (e, { name, value }) => {
    setQuestionState((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendUserMessage = () => {};

  /**
   * NOTE: this absolutely disgusting hack is necessary because of a bug in the way onClick evaluation works (or not)
   * in <code>EpisodeList</code>. For whatever reason (probably a bug), onClick would get a random 'episode' object
   * (or possibly due to some race condition). To work around this, I added an id attribute to each item in the
   * EpisodeList DOM (which gets evaluated immediately) and I used this id (a combination of the module_id and the
   * episode_id) to then retrieve (in <code>loadEpisode</code> below) the the correct module in the correct episode.
   *
   * There are certainly ways to improve this!
   *
   * @param moduleEpisode_id
   */
  const loadEpisode = ({ episode_id }) => {
    // ${episode.module_id}_${episode.id}
    // const module_id = elements[0];
    // const episode_id = elements[1];
    const episode = allEpisodesArr.find((ep) => ep.id === episode_id);
    setEpisode(episode ? episode : allEpisodesArr[0]);
  };

  const setQuiz = ({ quiz_id }) => {
    setShowQuiz(true);
    setQuizId(quiz_id);
    setActiveIndex(1);
    // setState({
    //     showQuiz: true,
    //     quiz_id,
    //     activeIndex: 1
    // }, () => {
    //     resetQuiz({quiz_id});
    // })
  };

  const nextQuestion = () => {
    setAnswerStatus("unanswered");
    setQuestionOrder(questionOrder + 1);
  };

  const finishQuiz = () => {
    nextEpisode(episode.id, "next");
  };

  const resetQuiz = async ({ quiz_id }) => {
    // reset answer selection
    const enabledQuestions = episode.quiz.questions.filter((q) => !q.disabled);

    await enabledQuestions.map((q, i) => {
      q.correct_answer_ids.map((_, j) => {
        setQuestionState((prevState) => ({
          ...prevState,
          [`question_${i}_${j}`]: undefined,
        }));
      });
    });
    setQuestionOrder(0);
    setAnswerStatus("unanswered");
    setPercentAnswered(0);
    setScore(0);
    // updateQuizBestScore({
    //     "input": {
    //         "organization_name": tenant?.organization_name,
    //         "tenant_id": tenant?.tenant_id_encrypted,
    //         "sub": user?.sub,
    //         "path_hash": md5(`${episode_id}/${episode.quiz?.id}`),
    //         "best_score": 0
    //     }
    // })
  };

  const closeQuiz = ({ module_id, episode_id, quiz_id }) => {
    setShowQuiz(false);
    nextEpisode(episode_id, "next");
    // setState({
    //     showQuiz: false
    // }, () => {
    //     nextEpisode(module_id, episode_id, 'next')
    // })
  };

  const gotoQuestion = ({ direction }) => {
    const question_order =
      direction === "next" ? questionOrder + 1 : questionOrder - 1;
    setQuestionOrder(question_order);
  };

  const arraysMatch = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  };

  const submitAnswer = async ({ module_id, episode_id, questionOrder }) => {
    setLoadingAnswer(true);
    const enabledQuestions = episode.quiz.questions.filter((q) => !q.disabled);
    const question = enabledQuestions[questionOrder];

    const user_answer_ids = Object.entries(questionState).map((e) => {
      const [k, v] = e;
      if (k.startsWith(`question_${questionOrder}`)) return v;
    });

    // updateStudentQuizAnswer({
    //     variables: {
    //         "input": {
    //             "organization_name": tenant?.organization_name,
    //             "tenant_id": tenant?.tenant_id_encrypted,
    //             "sub": user?.sub,
    //             "path_hash": md5(`${episode_id}/${episode.quiz?.id}/${question.id}`),
    //             "answer": user_answer_ids
    //         }
    //     }
    // })

    // getCorrectAnswerIds({
    //     variables: {
    //         "organization_name": tenant?.organization_name,
    //         "tenant_id": tenant?.tenant_id_encrypted,
    //         "episode_id": episode?.id,
    //         "quiz_id": episode?.quiz?.id,
    //         "id": question.id
    //     }
    // });
  };

  const quizAnswerStatus = (episode, answeredQuestion) => {
    const quizQuestions = user?.UserCourseQuizzes?.filter(
      (answer) => answer.quiz_id === episode.quiz.id
    );

    const numQuestionsAnswered = quizQuestions?.length || 0;

    const pctComplete =
      (numQuestionsAnswered + answeredQuestion) /
      episode.quiz?.questions.length;

    const percentAnswered = Math.round(pctComplete * 100);
    return { quizQuestions, percentAnswered };
  };

  const toggleCollapsedMode = () => {
    setSidebarWidth(sidebarWidth === "wide" ? "very thin" : "wide");
  };

  const handleTabChange = (e, { activeIndex }) => {
    setActiveIndex(activeIndex);
  };

  const { locale, isAuthenticated, userProfile } = props;
  if (!course) return null;
  if (!episode) return null;

  const PanelCTA = lazy(() =>
    import(
      `../components/Episodes/Panels/${_.capitalize(
        episode?.episode_type || "placeholder"
      )}Panel`
    )
  );

  const PanelProps = {
    quiz: {
      selected_values: questionState
        ? Object.entries(questionState).map((e) => {
            const [k, v] = e;
            if (k.startsWith(`question_${questionOrder}`)) return v;
          })
        : [],
      correctAnswerIds,
      gotoQuestion,
      submitAnswer,
      answerStatus,
      percentAnswered,
      loadingAnswer,
      score,
      nextQuestion,
      finishQuiz,
      resetQuiz,
      closeQuiz,
      handleChange,
      module_id: episode.module_id,
      episode_id: episode.id,
      quiz_id: quizId,
      questionOrder,
      locale,
      course,
      episode,
      selectedAnswerIds,
    },
    video: {
      playing,
      controls: true,
      width: "100%",
      height: "100vh",
      episode,
      // user,
      nextEpisode,
      episodeComplete,
      setEpisodeWaypoint,
      setEpisodeComplete,
    },
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div>
        <div>
          <Modal
            dimmer={"blurring"}
            open={showExitModal}
            onClose={() => setShowExitModal(false)}
          >
            <Modal.Header>Select a Photo</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>Quit course?</Header>
                <p> {exitModalMessage} </p>
              </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
              <Button
                positive
                icon="checkmark"
                content="Continue"
                onClick={() => setShowExitModal(false)}
              />
              <Button
                negative
                labelPosition="right"
                content="Quit course"
                onClick={() => quitEpisode()}
              />
            </Modal.Actions>
          </Modal>
          <Sidebar.Pushable as={Segment} style={{ height: "100vh" }}>
            {/* <Sidebar
              as={Menu}
              animation={"slide along"}
              icon="labeled"
              direction={"left"}
              inverted
              vertical
              visible
              width={sidebarWidth}
            >
              {sidebarWidth === "wide"
                ? wideSetup({
                    match: props.match,
                    allEpisodesArr,
                    setQuiz: setQuiz,
                    updateMessageRead: props.updateMessageRead,
                    showQuiz: showQuiz,
                    quizBestScores: [],
                    userProfile: null,
                    handleChange: handleChange,
                    sendUserMessage: sendUserMessage,
                    message,
                    loadEpisode,
                    ctxt: "episode", // needed because of a weird bug with props.
                    nextEpisode,
                    toggleCollapsedMode: toggleCollapsedMode,
                    handleTabChange,
                    activeIndex,
                    locale,
                    course,
                    episode,
                  })
                : thinSetup({
                    showQuiz: showQuiz,
                    userProfile: null,
                    allEpisodesArr,
                    loadEpisode,
                    nextEpisode,
                    toggleCollapsedMode: toggleCollapsedMode,
                    locale,
                    course,
                    episode,
                  })}
            </Sidebar> */}
            <Sidebar.Pusher>
              <Segment basic style={{ padding: "0" }}>
                <div
                  className={
                    showQuiz
                      ? ""
                      : `player-wrapper ${sidebarWidth?.replace(" ", "_")}`
                  }
                >
                  {
                    <Suspense fallback={<div>Loading...</div>}>
                      <PanelCTA {...PanelProps[`${episode.episode_type}`]} />
                    </Suspense>
                  }
                </div>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </div>
      </div>
    </div>
  );
};

export default Episode;
