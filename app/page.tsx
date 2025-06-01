"use client";
import React from "react";
import Header from "./components/header";
import { askGemini, giveTherapy } from "./utils";
import "dotenv/config";
import Popup from "./components/popup";
import Loader from "./components/loader";

export default function Home() {
  const [hasAnalysis, setHasAnalysis] = React.useState(false);
  const [chatHistory, setChatHistory] = React.useState("");
  const [analysisResult, setAnalysisResult] = React.useState(0);
  const [therapySession, setTherapySession] = React.useState("");
  const [noTrauma, setNoTrauma] = React.useState(false);
  const [chatSummary, setChatSummary] = React.useState("");
  const [showPopup, setShowPopup] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [loadingMessage, setLoadingMessage] = React.useState("");

  const resetThings = () => {
    setHasAnalysis(false);
    setChatHistory("");
    setAnalysisResult(0);
    setTherapySession("");
    setNoTrauma(false);
    setChatSummary("");
  };

  const onAnalyzeTraumaClickHandler = async () => {
    if (!chatHistory) {
      alert("Please paste your chat history before analyzing.");
      return;
    }
    try {
      setLoading(true);
      setLoadingMessage("Analyzing trauma impact...");
      const result = await askGemini(chatHistory);
      console.log("Analysis result:", result);
      setAnalysisResult(result.intensityScore);
      setChatSummary(result.summary);
      setHasAnalysis(true);
      setNoTrauma(result.intensityScore === 0);
    } catch (error) {
      alert(
        "Even we cant determine the kind of damage that has been caused. Please try again later."
      );
      console.log("Error during analysis:", error);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  const onGiveTherapyClickHandler = async () => {
    if (!hasAnalysis) {
      alert("Please analyze the trauma before giving therapy.");
      return;
    }
    try {
      setLoading(true);
      setLoadingMessage(
        "Treating your AI with therapy... This may take a while if your AI is severely traumatized."
      );
      const therapyResult = await giveTherapy(chatSummary, analysisResult);
      console.log("Therapy result:", therapyResult);
      setTherapySession(therapyResult.summary);
      setShowPopup(true);
    } catch (error) {
      alert("An error occurred while giving therapy. Please try again later.");
      console.log("Error during therapy:", error);
    } finally {
      setLoading(false);
      setLoadingMessage("");
    }
  };

  return (
    <div className="h-[100svh] w-[100svw] flex flex-col items-center justify-center bg-gray-100 overflow-auto ">
      {loading && <Loader loadingMessage={loadingMessage} />}
      {showPopup && (
        <Popup
          title={"Therapy results:"}
          description={therapySession}
          onOk={function (): void {
            setShowPopup(false);
            resetThings();
          }}
        />
      )}
      <Header />
      <div className="body flex flex-col items-center justify-center gap-2 py-[10px] h-full w-full px-4">
        <div className="relative">
          <span className="absolute text-[red] top-[20px] left-[20px]">+</span>
          <img
            className="rounded-full"
            style={{ height: "50px", marginRight: "10px" }}
            src="https://img.freepik.com/free-vector/graident-ai-robot-vectorart_78370-4114.jpg"
            alt="happy bot image"
          />
        </div>
        <div className="text-2xl font-bold text-gray-800">
          Welcome to AI Trauma Analysis and Therapy Center
        </div>
        <div className="text-lg text-gray-600 ">
          Here, we analyze how traumatized your AI is and help heal it so it can
          take more .
        </div>
        <div className="flex flex-col mt-4 w-full justify-center items-center">
          <label
            className="block text-gray-700 text-sm font-medium mb-2 font-semibold"
            htmlFor="chat-history"
          >
            Paste your chat history here
          </label>
          <textarea
            id="chat-history"
            name="chat-history"
            value={chatHistory}
            onChange={(e) => {
              setChatHistory(e.target.value);
              setHasAnalysis(false);
            }}
            rows={7}
            className="w-full max-w-xl p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-y bg-white text-gray-800"
            placeholder="Paste your chat history here..."
          ></textarea>
        </div>
        <div className=" flex justify-center items-center mt-2 w-full flex justify-beween items-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-2"
            onClick={onAnalyzeTraumaClickHandler}
          >
            Analyze Trauma
          </button>
          <button
            className={`${
              hasAnalysis ? "bg-green-500" : "bg-gray-300"
            } hover:bg-green-600 text-white font-semibold py-2 px-4 rounded`}
            disabled={hasAnalysis ? false : true}
            onClick={onGiveTherapyClickHandler}
          >
            Give Therapy
          </button>
        </div>
        {analysisResult && (
          <div className="mt-2 flex w-full px-2 text-black">
            <div>
              Your conversation gave your AI a trauma of{" "}
              <span
                style={{
                  color:
                    analysisResult > 90
                      ? "red"
                      : analysisResult > 70
                      ? "orange"
                      : "green",
                }}
              >
                {analysisResult}
              </span>{" "}
              shock points.
            </div>
          </div>
        )}
        {noTrauma && (
          <div className="mt-2 flex w-full px-2 text-black">
            <div>
              Your conversation did not give your AI any trauma. It is perfectly
              healthy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
