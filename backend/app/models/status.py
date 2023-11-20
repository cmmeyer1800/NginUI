"""Status Pydantic Models

Author: Collin Meyer
Last Modified: November 19, 2023
"""

from pydantic import BaseModel, Field

class NginxStubStatus(BaseModel): # pylint: disable=missing-class-docstring, too-few-public-methods
    active_connections: int = Field(..., alias="active-connections")
    connections_accepted: int = Field(..., alias="connections-accepted")
    connections_handled: int = Field(..., alias="connections-handled")
    requests_handled: int = Field(..., alias="requests-handled")
    curr_reading: int = Field(..., alias="curr-reading")
    curr_writing: int = Field(..., alias="curr-writing")
    curr_waiting: int = Field(..., alias="curr-waiting")
