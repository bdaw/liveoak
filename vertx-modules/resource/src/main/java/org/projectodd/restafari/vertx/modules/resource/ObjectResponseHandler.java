package org.projectodd.restafari.vertx.modules.resource;

/**
 * @author Bob McWhirter
 */
public interface ObjectResponseHandler {

    public void handle(String id, VertxResponder responder);
}