import { useEffect, useState } from "react";
import "./loading.style.scss";
import clsx from "clsx";
import useObservable from "@core/hooks/use-observable.hook";
import HttpService from "@core/services/http/http.service";

function Loading() {
  const [isShow, setIsShow] = useState(false);

  const { subscribeUntilDestroy } = useObservable();

  useEffect(() => {
    subscribeUntilDestroy(HttpService.isRequesting$, (isRequesting) => {
      if (isRequesting) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isShow) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isShow]);

  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 bottom-0 z-[9999] flex justify-center items-center",
        {
          hidden: !isShow,
        }
      )}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
    >
      <span className="loader"></span>
    </div>
  );
}

export default Loading;
