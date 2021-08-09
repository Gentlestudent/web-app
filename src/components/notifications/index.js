import { useState, useEffect, useRef, useCallback } from 'react';
import { colors } from '../../assets/styles/constants';

const getId = (() => {
  let id = 0;
  return () => id++;
})();

const Notifications = () => {
  const notificationsRef = useRef(new Set([]));
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    function handleEvent(event) {
      notificationsRef.current = new Set([...notificationsRef.current, {
        id: getId(),
        message: event.detail.message || '',
        duration: event.detail.duration || 2000,
        style: event.detail.style || 'info'
      }]);
      setNotifications([...notificationsRef.current]);
    }

    window.addEventListener('createNotification', handleEvent);

    return () => {
      window.removeEventListener('createNotification', handleEvent);
    };
  }, []);

  const removeNotification = useCallback(function removeNotification(notification) {
    return () => {
      notificationsRef.current = new Set(notificationsRef.current);
      notificationsRef.current.delete(notification);
      setNotifications([...notificationsRef.current]);
    };
  }, []);

  return (
    <>
      <div className="notifications-root">
        <div className="notifications">
          {notifications.map(notification => <Notification key={notification.id} notification={notification} removeThisNotification={removeNotification(notification)} />)}
        </div>
        {/* for some reason the styling of this component doesn't get loaded when there is no content, so we need this silly placeholder */}
        <span style={{ opacity: 0 }} />
      </div>

      <style jsx>
        {`
          .notifications-root {
            position: fixed;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
            pointer-events: none;
            display: flex;
            justify-content: center;
            align-items: flex-end;
            z-index: 2000;
            padding: 2rem 0;
          }

          .notifications {
            display: flex;
            flex-flow: column-reverse;
            grid-gap: 2rem;
          }
        `}
      </style>
    </>
  );
};

const Notification = ({ notification, removeThisNotification }) => {
  const [classes, setClasses] = useState(['notification', 'notification-appear']);
  const heightRef = useRef(0);
  const contentRef = useRef(null);

  let style;
  switch (notification.style) {
    case 'error': {
      style = 'notification-style-error';
      break;
    }
    case 'info':
    default: {
      style = 'notification-style-info';
    }
  }

  useEffect(() => {
    heightRef.current = contentRef.current?.getBoundingClientRect()?.height;
    setClasses(['notification-root']);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      heightRef.current = 0;
      setClasses(['notification-root', 'notification-disappear']);
      setTimeout(() => {
        removeThisNotification();
      }, 400);
    }, notification.duration);
  }, [notification, removeThisNotification]);

  return (
    <>
      <div className={classes.join(' ') + ` ${style}`}>
        <div className="notification-content" ref={contentRef}>
          {notification.message}
        </div>
      </div>

      <style jsx>
        {`
          .notification-root {
            height: ${heightRef.current}px;
            transition: height 0.8s linear;
            overflow: hidden;
            transition:
              height 0.2s cubic-bezier(0.55, -0.01, 0.27, 1.55),
              opacity 0.2s ease-in-out;
          }

          .notification-appear {
            height: 0px;
            opacity: 0;
          }

          .notification-disappear {
            transition:
              height 0.4s ease-in-out,
              opacity 0.4s ease-in-out;
            opacity: 0;
          }

          .notification-style-info .notification-content {
            background-color: white;
            border-color: ${colors.border};
          }

          .notification-style-error .notification-content {
            background-color: white;
            border-color: red;
            color: red;
          }

          .notification-content {
            border-width: 0.1rem;
            border-style: solid;
            border-radius 0.5rem;
            padding: 2rem 4rem;
          }
        `}
      </style>
    </>
  );
};

export default Notifications;
