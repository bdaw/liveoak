/*
 * Copyright 2013 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Eclipse Public License version 1.0, available at http://www.eclipse.org/legal/epl-v10.html
 */
package io.liveoak.spi.resource.async;

/**
 * @author Bob McWhirter
 */
public interface PropertySink {

    void accept(String name, Object value);
    void close();

}