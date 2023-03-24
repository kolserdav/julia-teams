use core::{future::Future, pin::Pin};
use futures::future;
use std::{any::Any, marker::Send, sync::Arc};
use webrtc::{
    error::Result,
    rtp_transceiver::rtp_codec::{RTCRtpCodecParameters, RTPCodecType},
    track::{
        track_local::{TrackLocal, TrackLocalContext},
        track_remote::TrackRemote,
    },
};

#[derive(Debug)]
pub struct Track(pub Arc<TrackRemote>);

impl TrackLocal for Track {
    fn bind<'life0, 'life1, 'async_trait>(
        &'life0 self,
        _: &'life1 TrackLocalContext,
    ) -> Pin<Box<dyn Future<Output = Result<RTCRtpCodecParameters>> + Send + 'async_trait>>
    where
        'life0: 'async_trait,
        'life1: 'async_trait,
        Self: 'async_trait,
    {
        Pin::from(Box::new(future::ok(self.0.codec())))
    }

    fn unbind<'life0, 'life1, 'async_trait>(
        &'life0 self,
        _: &'life1 TrackLocalContext,
    ) -> Pin<Box<dyn Future<Output = Result<()>> + Send + 'async_trait>>
    where
        'life0: 'async_trait,
        'life1: 'async_trait,
        Self: 'async_trait,
    {
        Pin::from(Box::new(future::ok(())))
    }

    fn kind(&self) -> RTPCodecType {
        self.0.kind()
    }

    fn as_any(&self) -> &dyn Any {
        &self.0
    }

    fn id(&self) -> &str {
        self.0.id().as_str()
    }

    fn stream_id(&self) -> &str {
        self.0.stream_id().as_str()
    }
}
