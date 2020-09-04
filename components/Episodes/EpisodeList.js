import React, { useState, useEffect, useRef } from "react";
import _ from "lodash";
import { List, Grid, Icon, Label, Popup } from "semantic-ui-react";

import data from "./data.json";

const EpisodeList = (props) => {
  const styles = { moduleColor: "beige", episodeColor: "beige" };

  const { course, episode: currEpisode } = data;

  const quizBestScores = [];
  return (
    <List
      style={
        styles.backgroundColor
          ? {
              backgroundColor: styles.backgroundColor,
              padding: styles.padding,
              height: "100%",
            }
          : { /*overflowY: "scroll",*/ height: "100%" }
      }
    >
      {course.modules.map((module, i) => {
        const userMessagesClone = []; /* user?.userMessages && Array.from(user?.userMessages); */
        return (
          <List.Item key={i} style={{ textAlign: "left" }}>
            <List.Description style={{ color: styles.moduleColor }}>
              {module[`title`]}
            </List.Description>
            {
              <div>
                <List>
                  {module.episodes.map((episode, j) => {
                    const quizComplete = false;
                    const bestQuizScoreObj =
                      episode.episode_type === "quiz" &&
                      quizBestScores?.find(
                        (score) => score.quiz_id === episode.id
                      );
                    const bestQuizScore = bestQuizScoreObj
                      ? bestQuizScoreObj.best_score
                      : 0;
                    const userQuizMessagesToShow = userMessagesClone?.filter(
                      (msg) =>
                        module.Quiz ? msg.quiz_id === module.Quiz.id : null
                    );
                    const quizResponses = userQuizMessagesToShow?.filter(
                      (msg) =>
                        msg.direction === "from" &&
                        typeof msg.message_read === "undefined"
                    );

                    const completed = false; /* student?.completed_episodes?.includes(episode.id); */
                    const userMessagesToShow =
                      userMessagesClone &&
                      userMessagesClone.filter(
                        (msg) =>
                          msg.quiz_id === null && msg.episode_id === episode.id
                      );
                    const responses =
                      userMessagesToShow &&
                      userMessagesToShow.filter(
                        (msg) =>
                          msg.direction === "from" && msg.message_read !== true
                      );

                    const is_quiz = episode.episode_type === "quiz";

                    return (
                      <>
                        {is_quiz === true ? (
                          <List.Item
                            as={"a"}
                            className={"episode"}
                            onClick={(e) => {
                              // dispatch(setQuiz({quiz_id: e.currentTarget.id}))
                              //    loadEpisode?.({episode_id: e.currentTarget.id}) /*: toEpisode(`/e/${episode.course_id}_${episode.module_id}_${episode.item_order}`)*/
                              // setQuiz({quiz_id: e.currentTarget.id})
                            }}
                            style={{
                              textAlign: "left",
                              margin: ".6em 0",
                            }}
                            id={`${episode.id}`}
                          >
                            <Grid columns={3}>
                              <Grid.Column width={2}>
                                {
                                  // user?.email !== "" ?
                                  //     <Icon name={"check"}
                                  //           size={"small"}
                                  //           style={bestQuizScore > 80 ? {color: 'greenyellow'} : {color: 'grey'}}/> :
                                  //     <Icon
                                  //         name={"play circle outline"}
                                  //         size={"small"}
                                  //         style={{color: 'grey'}}/>
                                }
                              </Grid.Column>
                              <Grid.Column
                                width={10}
                                style={{ color: styles.episodeColor }}
                                className={"truncate"}
                              >
                                {quizResponses && quizResponses.length > 0 && (
                                  <Popup
                                    trigger={
                                      <Label
                                        circular
                                        floating
                                        color={"red"}
                                        empty
                                        key={"red"}
                                        style={{
                                          minWidth: "2px",
                                          minHeight: "2px",
                                          top: "unset",
                                        }}
                                      />
                                    }
                                    content={`${quizResponses.length} new messages`}
                                    position={"right center"}
                                    inverted
                                  />
                                )}
                                <div
                                  className={
                                    props.ctxt === "course"
                                      ? "truncate-course"
                                      : "truncate-list"
                                  }
                                  style={
                                    currEpisode.id === episode.id
                                      ? {
                                          fontWeight: "700",
                                          color: "#c7c71c",
                                        }
                                      : {}
                                  }
                                >
                                  {`${
                                    episode.quiz?.[
                                      `quiz_name` /*`quiz_name_${locale}`*/
                                    ]
                                  }`}
                                </div>
                              </Grid.Column>
                              <Grid.Column
                                width={4}
                                style={
                                  bestQuizScore > 80
                                    ? { color: "greenyellow" }
                                    : {}
                                }
                              >
                                {bestQuizScore === 0 ? "" : `${bestQuizScore}%`}
                              </Grid.Column>
                            </Grid>
                          </List.Item>
                        ) : (
                          <List.Item
                            key={j}
                            as="a"
                            style={{
                              textAlign: "left",
                              lineHeight: "1.4em",
                            }}
                            onClick={(e) => {
                              //    loadEpisode?.({episode_id: e.currentTarget.id}) /*: toEpisode(`/e/${episode.course_id}_${episode.module_id}_${episode.item_order}`)*/
                            }}
                            id={`${episode.id}`}
                          >
                            <Grid columns={3}>
                              <Grid.Column width={2}>
                                {
                                  // user?.email !== "" ?
                                  //     <Icon name={"check"}
                                  //           size={"small"}
                                  //           style={completed ? {color: 'greenyellow'} : {color: 'grey'}}/> :
                                  //     <Icon
                                  //         name={"play circle outline"}
                                  //         size={"small"}/>
                                }
                              </Grid.Column>
                              <Grid.Column
                                width={10}
                                style={{
                                  color: styles.episodeColor,
                                }}
                              >
                                {responses && responses.length > 0 && (
                                  <Popup
                                    trigger={
                                      <Label
                                        circular
                                        floating
                                        color={"red"}
                                        empty
                                        key={"red"}
                                        style={{
                                          minWidth: "2px",
                                          minHeight: "2px",
                                          top: "unset",
                                        }}
                                      />
                                    }
                                    content={
                                      responses.length === 1
                                        ? `1 new message`
                                        : `${responses.length} new messages`
                                    }
                                    position={"right center"}
                                    inverted
                                  />
                                )}
                                <div
                                  className={
                                    props.ctxt === "course"
                                      ? "truncate-course"
                                      : "truncate-list"
                                  }
                                  style={
                                    currEpisode.id === episode.id
                                      ? {
                                          fontWeight: "700",
                                          color: "#c7c71c",
                                        }
                                      : {}
                                  }
                                >
                                  {episode[`title`]}
                                </div>
                              </Grid.Column>
                              <Grid.Column width={4}>
                                {episode.duration}
                              </Grid.Column>
                            </Grid>
                          </List.Item>
                        )}
                      </>
                    );
                  })}
                </List>
              </div>
            }
          </List.Item>
        );
      })}
    </List>
  );
};

export default EpisodeList;
