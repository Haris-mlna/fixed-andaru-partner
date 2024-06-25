"use client";

import * as React from "react";
import Sidebar from "../../components/layout/sidebar/sidebar";
import SidebarNotification from "../../components/layout/sidebar/sidebar-notification";
import Image from "next/image";
import { useUser } from "../../context/user/user-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraAlt, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { getFeeds } from "./page.service";
import { useFeed } from "../../context/feed/feed-context";
import Feed from "../../components/ui/feeds/feeds";
import SkeletonFeeds from "../../components/skeleton/feeds/feeds";
import ButtonMessage from "../../components/ui/button/button-message";
import { ModalPost } from "../../components/ui/modal/modal.post";
import building from "../../assets/images/buildings.png";

const Home = () => {
  const { companyData, user } = useUser();
  const { feed, setFeed } = useFeed();
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [update, setUpdate] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const latestPage = React.useRef(1);

  const imageDataUrl = `data:image/png;base64,${companyData?.ProfileImagePartner}`;
  const observer = React.useRef();

  React.useEffect(() => {
    const fetchData = async () => {
      if (latestPage.current === page && page !== 1) return;

      try {
        if (page === 1) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }

        const res = await getFeeds(user, page);

        if (res && res.data) {
          setFeed((prev) => (page === 1 ? res.data : [...prev, ...res.data]));
          if (res.data.length === 0 && page > 1) {
            setHasMore(false);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
        latestPage.current = page;
      }
    };

    if (user) {
      fetchData();
    }
  }, [user, page, update]);

  const handleObserver = React.useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loadingMore && hasMore) {
        setPage((prev) => prev + 1);
      }
    },
    [loadingMore, hasMore]
  );

  React.useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    observer.current = new IntersectionObserver(handleObserver, option);

    const loadMoreElement = document.getElementById("load-more");
    if (observer.current && loadMoreElement) {
      observer.current.observe(loadMoreElement);
    }

    return () => {
      if (observer.current && loadMoreElement) {
        observer.current.unobserve(loadMoreElement);
      }
    };
  }, [handleObserver]);

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="flex max-h-screen">
      {open && (
        <ModalPost
          open={open}
          setOpen={setOpen}
          setUpdate={setUpdate}
          update={update}
        />
      )}
      <ButtonMessage />
      <Sidebar />

      <div className="w-full flex">
        <div className="flex flex-1 flex-col">
          <section className="w-full min-h-40 gap-1 bg-white flex flex-col justify-center px-4 py-8 shadow-lg">
            <div className="flex gap-8 w-full">
              <button
                onClick={handleOpen}
                className="w-full outline-none bg-slate-200 rounded flex p-2 text-sm text-slate-600"
              >
                Apa yang anda pikirkan...
              </button>
              {companyData?.ProfileImagePartner ? (
                <Image
                  src={imageDataUrl}
                  width={200}
                  height={200}
                  alt="user"
                  className="w-20 h-20 object-contain rounded-full"
                />
              ) : (
                <Image
                  src={building}
                  width={200}
                  height={200}
                  alt="user"
                  className="w-20 h-20 object-contain rounded-full"
                />
              )}
            </div>
            <div className="w-full flex justify-between pr-28">
              <button
                onClick={handleOpen}
                className="w-32 outline-none h-8 flex text-sm items-center gap-2 px-2 text-slate-800 transition-all duration-300 bg-slate-100 rounded"
              >
                Unggah Foto
                <FontAwesomeIcon
                  icon={faCameraAlt}
                  className="text-green-400"
                />
              </button>
              <button
                onClick={handleOpen}
                className="w-24 h-8 bg-blue-500 rounded text-white text-sm flex justify-center items-center gap-2"
              >
                Bagikan
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </section>

          <section className="overflow-x-hidden overflow-y-auto w-full flex flex-col gap-2 py-2">
            {loading ? (
              <SkeletonFeeds />
            ) : feed.length > 0 ? (
              <>
                {feed.map((item) => (
                  <Feed item={item} key={item.Id} />
                ))}
              </>
            ) : (
              <div></div>
            )}
            <div
              id="load-more"
              className="w-full h-10 flex justify-center items-center"
            >
              {loadingMore && (
                <div className="w-full h-20 flex justify-center items-center">
                  Loading more feeds...
                </div>
              )}
              {!hasMore && (
                <div className="w-full h-20 flex justify-center items-center text-sm text-neutral-400">
                  Anda sudah melihat semua pembaharuan berita...
                </div>
              )}
            </div>
          </section>
        </div>
        <SidebarNotification />
      </div>
    </div>
  );
};

export default Home;
